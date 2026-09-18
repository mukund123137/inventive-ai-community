"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { PeachButton } from "@/components/ui/PeachButton";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [tab, setTab] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [signupDone, setSignupDone] = useState(false);

  async function logIn() {
    setError(null);
    setSubmitting(true);
    const { error } = await createClient().auth.signInWithPassword({ email, password });
    setSubmitting(false);
    if (error) {
      setError(error.message);
      return;
    }
    router.push("/");
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

  return (
    <div
      className="flex min-h-screen items-start justify-center p-[48px_20px]"
      style={{ background: "linear-gradient(139deg,#E1DAF7 -20%,#EEF0F1 55%)" }}
    >
      <div className="w-full max-w-[380px]">
        <div className="mb-5 flex items-center justify-center gap-2.5">
          <Image src="/assets/inventive-mark.svg" width={34} height={34} alt="" />
          <span className="font-display text-[18px] font-bold">Inventive AI Community</span>
        </div>
        <div className="rounded-xl border border-border bg-white p-6.5 shadow-modal">
          <div className="mb-5.5 flex gap-1 rounded-lg bg-neutral-bg p-[3px]">
            <span
              onClick={() => {
                setTab("login");
                setError(null);
              }}
              data-behavior="show login form"
              className="flex-1 cursor-pointer rounded-md p-2 text-center text-[13px] font-semibold"
              style={{ background: tab === "login" ? "#fff" : "transparent", color: tab === "login" ? "var(--color-ink)" : "var(--color-muted)" }}
            >
              Log In
            </span>
            <span
              onClick={() => {
                setTab("signup");
                setError(null);
              }}
              data-behavior="show signup form"
              className="flex-1 cursor-pointer rounded-md p-2 text-center text-[13px] font-semibold"
              style={{ background: tab === "signup" ? "#fff" : "transparent", color: tab === "signup" ? "var(--color-ink)" : "var(--color-muted)" }}
            >
              Sign Up
            </span>
          </div>

          {error && <div className="mb-3.5 rounded-lg bg-magenta-bg p-[10px_12px] text-[12.5px] text-magenta-dark">{error}</div>}

          {tab === "signup" ? (
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
                <PeachButton
                  fullWidth
                  disabled={submitting}
                  onClick={createAccount}
                  data-behavior="Supabase auth signUp -> email verification"
                  className="py-2.75"
                >
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
                className="mb-2 w-full rounded-lg border border-border bg-surface-alt p-[10px_12px] text-[14px] outline-none"
              />
              <div className="mb-4 text-right">
                <span onClick={() => router.push("/reset-password")} data-behavior="-> password reset flow" className="cursor-pointer text-[12px] text-lilac">
                  Forgot password?
                </span>
              </div>
              <PeachButton
                fullWidth
                disabled={submitting}
                onClick={logIn}
                data-behavior="Supabase signInWithPassword -> home"
                className="py-2.75"
              >
                Log In
              </PeachButton>
            </div>
          )}
        </div>
        <p className="mt-4 text-center text-[11px] text-muted-2">By continuing you agree to the Community Guidelines.</p>
      </div>
    </div>
  );
}
