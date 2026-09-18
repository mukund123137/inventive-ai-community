"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Header } from "./Header";
import { MobileHeader } from "./MobileHeader";
import { MobileBottomNav } from "./MobileBottomNav";

const CHROMELESS_ROUTES = ["/login", "/reset-password"];

export function AppChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const chromeless = CHROMELESS_ROUTES.includes(pathname);

  if (chromeless) {
    return <div className="min-h-screen bg-page">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-page pb-16 md:pb-0">
      <Header />
      <MobileHeader />
      {children}
      <MobileBottomNav />
    </div>
  );
}
