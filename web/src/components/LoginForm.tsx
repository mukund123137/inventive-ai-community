"use client";

import { useState } from "react";
import Image from "next/image";
import { PeachButton } from "@/components/ui/PeachButton";
import { createClient } from "@/lib/supabase/client";

type Mode = "login" | "signup" | "reset";

/**
 * The shared authentication form — the same login / signup / reset-link UI the
 * standalone /login page has always used, extracted so it can be reused inside
 * the LoginModal without duplicating the auth logic or restyling anything.
 *
 * `onLoggedIn` fires after a successful password sign-in (the modal uses it as
 * a hint; the real close/continue is driven by the auth session updating).
 */
export function LoginForm({ onLoggedIn }: { onLoggedIn?: () => void }) {
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [signupDone, setSignupDone] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  function switchMode(next: Mode) {
    setMode(next);
    setError(null);
  }

  async function logIn() {
    setError(null);
    setSubmitting(true);
    const { error } = await createClient().auth.signInWithPassword({ email, password });
    setSubmitting(false);
    if (error) {
      setError(error.message);
      return;
    }
    onLoggedIn?.();
  }

  async function createAccount() {
    setError(null);
    setSubmitting(true);
    const { error } = await createClient().auth.signUp({
      email,
      password,
      options: { data: { display_name: fullName } },
    });
    setSubmitting(false);
    if (error) {
      setError(error.message);
      return;
    }
    setSignupDone(true);
  }

  async function sendResetLink() {
    setError(null);
    setSubmitting(true);
    const { error } = await createClient().auth.resetPasswordForEmail(email);
    setSubmitting(false);
    if (error) {
      setError(error.message);
      return;
    }
    setResetSent(true);
  }

  return (
    <div className="w-full max-w-[380px]">
      <div className="mb-5 flex items-center justify-center gap-2.5">
        <Image src="/assets/inventive-mark.svg" width={34} height={34} alt="" />
        <span className="font-display text-[18px] font-bold">Inventive AI Community</span>
      </div>
      <div className="rounded-xl border border-border bg-white p-6.5 shadow-modal">
        {mode !== "reset" && (
          <div className="mb-5.5 flex gap-1 rounded-lg bg-neutral-bg p-[3px]">
            <span
              onClick={() => switchMode("login")}
              data-behavior="show login form"
              className="flex-1 cursor-pointer rounded-md p-2 text-center text-[13px] font-semibold"
              style={{ background: mode === "login" ? "#fff" : "transparent", color: mode === "login" ? "var(--color-ink)" : "var(--color-muted)" }}
            >
              Log In
            </span>
            <span
              onClick={() => switchMode("signup")}
              data-behavior="show signup form"
              className="flex-1 cursor-pointer rounded-md p-2 text-center text-[13px] font-semibold"
              style={{ background: mode === "signup" ? "#fff" : "transparent", color: mode === "signup" ? "var(--color-ink)" : "var(--color-muted)" }}
            >
              Sign Up
            </span>
          </div>
        )}

        {error && <div className="mb-3.5 rounded-lg bg-magenta-bg p-[10px_12px] text-[12.5px] text-magenta-dark">{error}</div>}

        {mode === "reset" ? (
          <div>
            <h2 className="font-display mb-1.5 text-[17px] font-bold">Reset your password</h2>
            {resetSent ? (
              <p className="mb-1 text-[13px] leading-[1.5] text-muted">
                If an account exists for <b>{email}</b>, a reset link is on its way.
              </p>
            ) : (
              <>
                <p className="mb-4.5 text-[13px] leading-[1.5] text-muted">
                  Enter the email you use for the community and we&apos;ll send a reset link.
                </p>
                <label className="mb-1.5 block text-[12px] font-semibold">Work email</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="mb-4.5 w-full rounded-lg border border-border bg-surface-alt p-[10px_12px] text-[14px] outline-none"
                />
                <PeachButton fullWidth disabled={submitting} onClick={sendResetLink} className="mb-3.5 py-2.75">
                  Send reset link
                </PeachButton>
              </>
            )}
            <div className="text-center">
              <span onClick={() => switchMode("login")} data-behavior="-> back to login" className="cursor-pointer text-[12px] text-lilac">
                ← Back to log in
              </span>
            </div>
          </div>
        ) : mode === "signup" ? (
          signupDone ? (
            <div className="py-2 text-center text-[13px] text-body">
              Check <b>{email}</b> for a confirmation link to finish creating your account.
            </div>
          ) : (
            <div>
              <label className="mb-1.5 block text-[12px] font-semibold">Full name</label>
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Jordan Lee"
                className="mb-3.5 w-full rounded-lg border border-border bg-surface-alt p-[10px_12px] text-[14px] outline-none"
              />
              <label className="mb-1.5 block text-[12px] font-semibold">Work email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                data-behavior="validated; must be a work domain"
                className="mb-3.5 w-full rounded-lg border border-border bg-surface-alt p-[10px_12px] text-[14px] outline-none"
              />
              <label className="mb-1.5 block text-[12px] font-semibold">Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="At least 8 characters"
                className="mb-4.5 w-full rounded-lg border border-border bg-surface-alt p-[10px_12px] text-[14px] outline-none"
              />
              <PeachButton fullWidth disabled={submitting} onClick={createAccount} className="py-2.75">
                Create Account
              </PeachButton>
            </div>
          )
        ) : (
          <div>
            <label className="mb-1.5 block text-[12px] font-semibold">Work email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="mb-3.5 w-full rounded-lg border border-border bg-surface-alt p-[10px_12px] text-[14px] outline-none"
            />
            <label className="mb-1.5 block text-[12px] font-semibold">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Your password"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !submitting) logIn();
              }}
              className="mb-2 w-full rounded-lg border border-border bg-surface-alt p-[10px_12px] text-[14px] outline-none"
            />
            <div className="mb-4 text-right">
              <span onClick={() => switchMode("reset")} data-behavior="-> password reset flow" className="cursor-pointer text-[12px] text-lilac">
                Forgot password?
              </span>
            </div>
            <PeachButton fullWidth disabled={submitting} onClick={logIn} className="py-2.75">
              Log In
            </PeachButton>
          </div>
        )}
      </div>
      <p className="mt-4 text-center text-[11px] text-muted-2">By continuing you agree to the Community Guidelines.</p>
    </div>
  );
}
