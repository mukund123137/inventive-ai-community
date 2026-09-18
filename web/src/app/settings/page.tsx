"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ToggleSwitch } from "@/components/ui/ToggleSwitch";
import { GrayButton, PeachButton } from "@/components/ui/PeachButton";
import { useAuth } from "@/lib/auth";
import { useTogglePref } from "@/lib/mutations";
import { useNotificationPrefs } from "@/lib/queries";
import { createClient } from "@/lib/supabase/client";
import type { NotificationPreferencesRow } from "@/lib/supabase/database.types";

const PREF_ROWS: { key: keyof Omit<NotificationPreferencesRow, "user_id">; label: string }[] = [
  { key: "answers", label: "New answers to your questions" },
  { key: "mentions", label: "Mentions of you" },
  { key: "verified", label: "An answer gets Staff Verified" },
  { key: "upvotes", label: "Upvotes on your posts" },
  { key: "digest", label: "Weekly community digest" },
];

export default function SettingsPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { data: prefs } = useNotificationPrefs();
  const togglePref = useTogglePref();

  const [editingEmail, setEditingEmail] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [emailSaving, setEmailSaving] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [emailSent, setEmailSent] = useState(false);

  async function changeEmail() {
    const email = newEmail.trim();
    if (!email || emailSaving) return;
    setEmailSaving(true);
    setEmailError(null);
    const { error } = await createClient().auth.updateUser({ email });
    setEmailSaving(false);
    if (error) {
      setEmailError(error.message);
      return;
    }
    setEmailSent(true);
    setEditingEmail(false);
  }

  return (
    <div className="mx-auto max-w-[640px] p-[22px_24px_48px]">
      <h1 className="font-display mb-5 text-2xl font-bold tracking-[-.3px]">Settings</h1>

      <div className="mb-4 overflow-hidden rounded-[10px] border border-border bg-surface">
        <div className="border-b border-border-3 p-[16px_20px] text-[14px] font-bold">Account</div>
        <div className="p-[8px_20px]">
          <div className="border-b border-border-3 py-3">
            <div className="flex items-center">
              <div>
                <div className="text-[13px] font-semibold">Email</div>
                <div className="text-[12px] text-muted-2">{user?.email}</div>
              </div>
              {!editingEmail && (
                <span
                  onClick={() => {
                    setEditingEmail(true);
                    setNewEmail("");
                    setEmailError(null);
                    setEmailSent(false);
                  }}
                  data-behavior="-> change email flow"
                  className="ml-auto cursor-pointer text-[12px] font-semibold text-lilac"
                >
                  Change
                </span>
              )}
            </div>
            {emailSent && (
              <div className="mt-2 rounded-lg bg-success-bg p-[10px_12px] text-[12.5px] text-success-fg">
                Confirmation link sent. Open it from your new inbox to finish the change.
              </div>
            )}
            {editingEmail && (
              <div className="mt-3">
                <label className="mb-1.5 block text-[12px] font-semibold">New email</label>
                <input
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  type="email"
                  placeholder="you@company.com"
                  className="mb-2 w-full rounded-lg border border-border bg-surface-alt p-[10px_12px] text-[14px] outline-none"
                />
                {emailError && <div className="mb-2 text-[12px] text-magenta-dark">{emailError}</div>}
                <div className="flex justify-end gap-2.5">
                  <GrayButton onClick={() => setEditingEmail(false)}>Cancel</GrayButton>
                  <PeachButton onClick={changeEmail} disabled={emailSaving}>
                    {emailSaving ? "Sending…" : "Send confirmation"}
                  </PeachButton>
                </div>
              </div>
            )}
          </div>
          <div className="flex items-center py-3">
            <div>
              <div className="text-[13px] font-semibold">Password</div>
              <div className="text-[12px] text-muted-2">Last changed 3 months ago</div>
            </div>
            <span
              onClick={() => router.push("/reset-password")}
              data-behavior="-> reset password"
              className="ml-auto cursor-pointer text-[12px] font-semibold text-lilac"
            >
              Change
            </span>
          </div>
        </div>
      </div>

      <div className="mb-4 overflow-hidden rounded-[10px] border border-border bg-surface">
        <div className="flex items-baseline gap-2 border-b border-border-3 p-[16px_20px]">
          <span className="text-[14px] font-bold">Notifications</span>
          <span className="text-[12px] text-muted-2">Email me when…</span>
        </div>
        <div className="p-[6px_20px]">
          {PREF_ROWS.map((row) => (
            <div key={row.key} className="flex items-center gap-3 border-b border-border-3 py-3.5 last:border-b-0">
              <span className="flex-1 text-[13px]">{row.label}</span>
              <ToggleSwitch
                on={prefs?.[row.key] ?? false}
                onClick={() => togglePref.mutate({ key: row.key, value: !prefs?.[row.key] })}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3 rounded-[10px] border border-[#F5D6E1] bg-[#FDF2F6] p-[16px_20px]">
        <div className="flex-1">
          <div className="text-[13px] font-semibold text-magenta-dark">Log out of the community</div>
          <div className="text-[12px] text-[#9C6B80]">You can sign back in any time with SSO or email.</div>
        </div>
        <button
          type="button"
          onClick={async () => {
            await createClient().auth.signOut();
            router.push("/");
          }}
          data-behavior="Supabase signOut -> login"
          className="cursor-pointer rounded-md border border-magenta-border bg-white px-4 py-2 text-[13px] font-semibold text-magenta-dark"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}
