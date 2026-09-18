"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Avatar } from "@/components/ui/Avatar";
import { GrayButton, PeachButton } from "@/components/ui/PeachButton";
import { BackIcon, CameraIcon } from "@/components/icons";
import { useAuth } from "@/lib/auth";
import { initialsOf } from "@/lib/time";
import { useUpdateProfile } from "@/lib/mutations";
import { createClient } from "@/lib/supabase/client";

export default function EditProfilePage() {
  const router = useRouter();
  const { profile } = useAuth();
  const updateProfile = useUpdateProfile();
  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [company, setCompany] = useState("");
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [initializedFor, setInitializedFor] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  // Populate the form once per profile identity (not an effect — see
  // react-hooks/set-state-in-effect: this is the "adjust state during
  // render" pattern, not a synchronized-with-an-external-system effect).
  if (profile && initializedFor !== profile.id) {
    setInitializedFor(profile.id);
    setDisplayName(profile.display_name);
    setUsername(profile.username);
    setCompany(profile.company ?? "");
    setBio(profile.bio ?? "");
    setAvatarUrl(profile.avatar_url ?? null);
  }

  if (!profile) return null;

  async function onPickPhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = ""; // let the same file be re-selected later
    if (!file || !profile) return;
    setUploadError(null);
    if (!file.type.startsWith("image/")) {
      setUploadError("Please choose an image file.");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setUploadError("Image must be under 2 MB.");
      return;
    }
    setUploading(true);
    const supabase = createClient();
    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const path = `${profile.id}/${Date.now()}.${ext}`;
    const { error: upErr } = await supabase.storage.from("avatars").upload(path, file, { upsert: true, contentType: file.type });
    if (upErr) {
      setUploading(false);
      setUploadError(upErr.message);
      return;
    }
    const url = supabase.storage.from("avatars").getPublicUrl(path).data.publicUrl;
    updateProfile.mutate(
      { avatar_url: url },
      {
        onSuccess: () => {
          setAvatarUrl(url);
          setUploading(false);
        },
        onError: (err) => {
          setUploadError((err as Error).message);
          setUploading(false);
        },
      }
    );
  }

  return (
    <div className="mx-auto max-w-[640px] p-[22px_24px_48px]">
      <div
        onClick={() => router.push("/profile")}
        data-behavior="discard -> profile"
        className="mb-3.5 inline-flex cursor-pointer items-center gap-1.5 text-[13px] text-muted hover:text-lilac"
      >
        <BackIcon style={{ fontSize: 15 }} />
        Cancel
      </div>
      <h1 className="font-display mb-5 text-2xl font-bold tracking-[-.3px]">Edit Profile</h1>
      <div className="rounded-[10px] border border-border bg-surface p-[22px] shadow-card">
        <div className="mb-5 flex items-center gap-3.5">
          <Avatar
            author={{ id: profile.id, username, name: displayName, initials: initialsOf(displayName), tone: profile.avatar_tone, avatarUrl, isStaff: profile.role === "admin", role: profile.role === "admin" ? "Inventive Staff" : "Member" }}
            size="xl"
          />
          <div>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={onPickPhoto}
              className="hidden"
            />
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                disabled={uploading}
                onClick={() => fileRef.current?.click()}
                data-behavior="opens avatar upload (Supabase Storage)"
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-md border border-border bg-gradient-to-b from-white to-[#f3f4f6] px-3.5 py-2 text-[13px] font-semibold text-[#323739] disabled:opacity-60"
              >
                <CameraIcon style={{ fontSize: 14 }} />
                {uploading ? "Uploading…" : "Change photo"}
              </button>
              {avatarUrl && !uploading && (
                <button
                  type="button"
                  onClick={() => updateProfile.mutate({ avatar_url: null }, { onSuccess: () => setAvatarUrl(null) })}
                  className="cursor-pointer text-[12px] font-semibold text-magenta-dark"
                >
                  Remove
                </button>
              )}
            </div>
            {uploadError && <div className="mt-1.5 text-[12px] text-magenta-dark">{uploadError}</div>}
          </div>
        </div>

        <label className="mb-1.5 block text-[13px] font-semibold">Display name</label>
        <input
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          className="mb-4 w-full rounded-lg border border-border bg-surface-alt p-[10px_12px] text-[14px] outline-none"
        />

        <label className="mb-1.5 block text-[13px] font-semibold">Username</label>
        <div className="mb-4 flex items-center overflow-hidden rounded-lg border border-border bg-surface-alt">
          <span className="p-[10px_0_10px_12px] text-[14px] text-muted-2">community.inventive.ai/u/</span>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            data-behavior="validated unique on blur"
            className="flex-1 border-none bg-transparent p-[10px_8px] text-[14px] outline-none"
          />
        </div>

        <label className="mb-1.5 block text-[13px] font-semibold">Company</label>
        <input
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="mb-4 w-full rounded-lg border border-border bg-surface-alt p-[10px_12px] text-[14px] outline-none"
        />

        <label className="mb-1.5 block text-[13px] font-semibold">Bio</label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="A line or two about what you work on"
          className="mb-5 min-h-[90px] w-full resize-y rounded-lg border border-border bg-surface-alt p-3 text-[13px] leading-[1.6] outline-none"
        />

        {updateProfile.isError && (
          <div className="mb-3 rounded-lg bg-magenta-bg p-[10px_12px] text-[12.5px] text-magenta-dark">
            Couldn&apos;t save your profile: {(updateProfile.error as Error).message}
          </div>
        )}
        <div className="flex justify-end gap-2.5">
          <GrayButton onClick={() => router.push("/profile")} data-behavior="discard">
            Cancel
          </GrayButton>
          <PeachButton
            disabled={updateProfile.isPending}
            onClick={() => {
              if (updateProfile.isPending || !displayName.trim() || !username.trim()) return;
              updateProfile.mutate(
                { display_name: displayName, username, company, bio },
                { onSuccess: () => router.push(`/u/${username}`) }
              );
            }}
            data-behavior="update profiles row -> back to profile"
          >
            {updateProfile.isPending ? "Saving…" : "Save Changes"}
          </PeachButton>
        </div>
      </div>
    </div>
  );
}
