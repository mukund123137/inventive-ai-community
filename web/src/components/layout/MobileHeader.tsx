"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Avatar } from "@/components/ui/Avatar";
import { MenuIcon, SearchIcon } from "@/components/icons";
import { useAuth } from "@/lib/auth";
import { toAuthor } from "@/lib/data-types";

export function MobileHeader() {
  const router = useRouter();
  const { profile } = useAuth();

  return (
    <header className="sticky top-0 z-20 flex h-[54px] items-center gap-2.5 border-b border-border-2 bg-white px-3.5 md:hidden">
      {profile?.role === "admin" && (
        <button
          type="button"
          onClick={() => router.push("/admin")}
          title="Admin"
          className="cursor-pointer border-none bg-transparent p-0"
        >
          <MenuIcon style={{ fontSize: 22, color: "#4A5154" }} />
        </button>
      )}
      <div onClick={() => router.push("/")} className="flex cursor-pointer items-center gap-[7px]">
        <Image src="/assets/inventive-mark.svg" width={24} height={24} alt="" />
        <span className="font-display text-[14px] font-bold">Community</span>
      </div>
      <div className="ml-auto flex items-center gap-3">
        <SearchIcon onClick={() => router.push("/search")} style={{ fontSize: 20, color: "#4A5154", cursor: "pointer" }} />
        {profile && <Avatar author={toAuthor(profile)} size="sm" onClick={() => router.push(`/u/${profile.username}`)} />}
      </div>
    </header>
  );
}
