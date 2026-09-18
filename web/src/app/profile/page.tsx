"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";

export default function MyProfilePage() {
  const router = useRouter();
  const { profile, loading } = useAuth();

  useEffect(() => {
    if (!loading && profile) router.replace(`/u/${profile.username}`);
  }, [loading, profile, router]);

  return null;
}
