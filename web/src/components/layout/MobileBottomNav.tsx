"use client";

import { usePathname, useRouter } from "next/navigation";
import { AddIcon, BellIcon, HomeIcon, PersonIcon, SearchIcon } from "@/components/icons";
import { useAuthModal } from "@/lib/auth-modal";
import { useUnreadCount } from "@/lib/queries";

function tint(active: boolean) {
  return active ? "var(--color-lilac)" : "#9CA3AF";
}

export function MobileBottomNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { requireAuth } = useAuthModal();
  const unread = useUnreadCount();

  const items = [
    { key: "home", label: "Home", icon: HomeIcon, active: pathname === "/", onClick: () => router.push("/") },
    { key: "search", label: "Search", icon: SearchIcon, active: pathname === "/search", onClick: () => router.push("/search") },
  ];

  return (
    <div className="fixed right-0 bottom-0 left-0 z-30 flex h-14 items-center border-t border-border-2 bg-white md:hidden">
      {items.map((it) => (
        <div key={it.key} onClick={it.onClick} data-behavior={`-> ${it.label.toLowerCase()}`} className="flex-1 cursor-pointer text-center">
          <it.icon style={{ fontSize: 20, color: tint(it.active) }} />
          <div className="mt-0.5 text-[9px]" style={{ color: tint(it.active) }}>
            {it.label}
          </div>
        </div>
      ))}
      <div onClick={() => requireAuth(() => router.push("/ask"))} data-behavior="-> ask (login required)" className="flex-1 cursor-pointer text-center">
        <div className="mx-auto flex h-[34px] w-[34px] items-center justify-center rounded-full bg-ink">
          <AddIcon style={{ fontSize: 18, color: "#fff" }} />
        </div>
      </div>
      <div
        onClick={() => requireAuth(() => router.push("/notifications"))}
        data-behavior="-> notifications (login required)"
        className="relative flex-1 cursor-pointer text-center"
      >
        <BellIcon style={{ fontSize: 20, color: tint(pathname === "/notifications") }} />
        {unread > 0 && (
          <span className="absolute -top-0.5 right-6 h-2 w-2 rounded-full bg-magenta" />
        )}
        <div className="mt-0.5 text-[9px]" style={{ color: tint(pathname === "/notifications") }}>
          Alerts
        </div>
      </div>
      <div onClick={() => requireAuth(() => router.push("/profile"))} data-behavior="-> profile (login required)" className="flex-1 cursor-pointer text-center">
        <PersonIcon style={{ fontSize: 20, color: tint(pathname.startsWith("/profile")) }} />
        <div className="mt-0.5 text-[9px]" style={{ color: tint(pathname.startsWith("/profile")) }}>
          You
        </div>
      </div>
    </div>
  );
}
