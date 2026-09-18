"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LoginForm } from "@/components/LoginForm";
import { useAuth } from "@/lib/auth";

/**
 * Standalone /login page, kept for direct navigation and as the redirect target
 * for protected routes (e.g. /admin) hit while signed out. The everyday login
 * experience is the LoginModal; this reuses the same LoginForm component so the
 * two never diverge. On a successful sign-in we send the user home.
 */
export default function LoginPage() {
  const router = useRouter();
  const { profile } = useAuth();

  useEffect(() => {
    if (profile) router.replace("/");
  }, [profile, router]);

  return (
    <div
      className="flex min-h-screen items-start justify-center p-[48px_20px]"
      style={{ background: "linear-gradient(139deg,#E1DAF7 -20%,#EEF0F1 55%)" }}
    >
      <LoginForm onLoggedIn={() => router.replace("/")} />
    </div>
  );
}
