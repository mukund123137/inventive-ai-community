"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { PeachButton } from "@/components/ui/PeachButton";
import { createClient } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function sendResetLink() {
    setSubmitting(true);
    setError(null);
    const { error } = await createClient().auth.resetPasswordForEmail(email);
    setSubmitting(false);
    if (error) {
      setError(error.message);
      return;
    }
    setSent(true);
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
          <h1 className="font-display mb-1.5 text-xl font-bold">Reset your password</h1>
          {sent ? (
            <p className="mb-1 text-[13px] leading-[1.5] text-muted">
              If an account exists for <b>{email}</b>, a reset link is on its way.
            </p>
          ) : (
            <>
              <p className="mb-4.5 text-[13px] leading-[1.5] text-muted">
                Enter the email you use for the community and we&apos;ll send a reset link.
              </p>
              {error && <div className="mb-3.5 rounded-lg bg-magenta-bg p-[10px_12px] text-[12.5px] text-magenta-dark">{error}</div>}
              <label className="mb-1.5 block text-[12px] font-semibold">Work email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="mb-4.5 w-full rounded-lg border border-border bg-surface-alt p-[10px_12px] text-[14px] outline-none"
              />
              <PeachButton
                fullWidth
                disabled={submitting}
                onClick={sendResetLink}
                data-behavior="Supabase resetPasswordForEmail -> confirmation"
                className="mb-3.5 py-2.75"
              >
                Send reset link
              </PeachButton>
            </>
          )}
          <div className="text-center">
            <span onClick={() => router.push("/login")} data-behavior="-> back to login" className="cursor-pointer text-[12px] text-lilac">
              ← Back to log in
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
