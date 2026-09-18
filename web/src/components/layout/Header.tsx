"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Avatar } from "@/components/ui/Avatar";
import { BellIcon } from "@/components/icons";
import { useAuth } from "@/lib/auth";
import { useAuthModal } from "@/lib/auth-modal";
import { toAuthor } from "@/lib/data-types";
import { useUnreadCount } from "@/lib/queries";

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { profile } = useAuth();
  const { requireAuth, openLogin } = useAuthModal();
  const unread = useUnreadCount();
  const isFeed = pathname === "/";

  return (
    <header
      data-behavior="Persistent top nav on all authed screens"
      className="sticky top-0 z-20 hidden h-[76px] items-center gap-[18px] border-b border-black/[.08] bg-white/80 px-8 backdrop-blur-md md:flex"
    >
      <div
        onClick={() => router.push("/")}
        data-behavior="Logo -> community homepage"
        className="flex cursor-pointer items-center gap-[11px]"
      >
        <Image src="/assets/inventive-wordmark.svg" height={26} width={132} alt="Inventive" priority />
        <span className="h-[22px] w-px bg-[#E1E4E5]" />
        <span className="font-display text-[14px] font-semibold tracking-[-.2px] text-ink">Community</span>
      </div>
      <nav className="ml-2.5 flex gap-0.5">
        <Link
          href="/"
          data-behavior="-> question listing"
          className="rounded-md px-[11px] py-[7px] text-[13px] no-underline"
          style={{
            fontWeight: isFeed ? 600 : 500,
            color: isFeed ? "var(--color-lilac-dark)" : "#4A5154",
            background: isFeed ? "var(--color-lilac-tint)" : "transparent",
          }}
        >
          Ask &amp; Answer
        </Link>
        {profile?.role === "admin" && (
          <Link
            href="/admin"
            className="rounded-md px-[11px] py-[7px] text-[13px] no-underline"
            style={{
              fontWeight: pathname === "/admin" ? 600 : 500,
              color: pathname === "/admin" ? "var(--color-lilac-dark)" : "#4A5154",
              background: pathname === "/admin" ? "var(--color-lilac-tint)" : "transparent",
            }}
          >
            Admin
          </Link>
        )}
      </nav>
      <button
        type="button"
        onClick={() => requireAuth(() => router.push("/ask"))}
        data-behavior="-> Ask Question flow (login required)"
        className="ml-auto cursor-pointer rounded-md border border-peach bg-peach px-4 py-[9px] text-[13.5px] font-semibold whitespace-nowrap text-ink transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-white"
      >
        Ask a Question
      </button>
      {profile ? (
        <>
          <div
            onClick={() => router.push("/notifications")}
            data-behavior="-> notifications"
            className="relative flex-none cursor-pointer"
          >
            <BellIcon style={{ fontSize: 19, color: "#4A5154" }} />
            {unread > 0 && (
              <span className="absolute -top-[3px] -right-[3px] flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-magenta px-[3px] text-[9px] font-bold text-white">
                {unread}
              </span>
            )}
          </div>
          <Avatar author={toAuthor(profile)} onClick={() => router.push(`/u/${profile.username}`)} />
        </>
      ) : (
        <button
          type="button"
          onClick={openLogin}
          data-behavior="open login modal"
          className="flex-none cursor-pointer rounded-md border border-border bg-white px-4 py-[9px] text-[13.5px] font-semibold whitespace-nowrap text-ink hover:bg-surface-alt"
        >
          Log In
        </button>
      )}
    </header>
  );
}
