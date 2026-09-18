"use client";

import { useEffect } from "react";
import { CloseIcon } from "@/components/icons";
import { LoginForm } from "@/components/LoginForm";

/**
 * The login experience as an overlay dialog. Same auth form as the /login page
 * (via the shared LoginForm), shown on top of the current page so browsing
 * context is preserved. Closes on the ✕, on backdrop click, and on Escape.
 */
export function LoginModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-[rgba(16,24,40,.5)] p-5 py-[8vh]"
    >
      <div onClick={(e) => e.stopPropagation()} className="relative w-full max-w-[380px]">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          data-behavior="close login modal"
          className="absolute -top-1 right-0 z-10 cursor-pointer border-none bg-transparent p-1 text-white/90 hover:text-white"
        >
          <CloseIcon style={{ fontSize: 20 }} />
        </button>
        <LoginForm onLoggedIn={onClose} />
      </div>
    </div>
  );
}
