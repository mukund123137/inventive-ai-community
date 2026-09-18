"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { LoginModal } from "@/components/LoginModal";
import { useAuth } from "./auth";

interface AuthModalState {
  /** Run `action` if signed in; otherwise open the login modal and, once the
   *  user signs in, run `action` and close the modal. The single entry point
   *  every protected button uses (Ask, Answer, Upvote, Report, …). */
  requireAuth: (action?: () => void) => void;
  /** Just open the login modal (e.g. a header "Log In" button). */
  openLogin: () => void;
}

const AuthModalContext = createContext<AuthModalState>({ requireAuth: () => {}, openLogin: () => {} });

export function AuthModalProvider({ children }: { children: ReactNode }) {
  const { profile } = useAuth();
  const [open, setOpen] = useState(false);
  const pendingRef = useRef<(() => void) | null>(null);

  function requireAuth(action?: () => void) {
    if (profile) {
      action?.();
      return;
    }
    pendingRef.current = action ?? null;
    setOpen(true);
  }

  function openLogin() {
    pendingRef.current = null;
    setOpen(true);
  }

  function close() {
    pendingRef.current = null;
    setOpen(false);
  }

  // Synchronize the modal with the external auth session: once the signed-in
  // profile has loaded (async, from Supabase) while the modal is open, close it
  // and continue whatever the user was trying to do. This is the sanctioned
  // "react to an external system" effect — the setState closes UI in response to
  // an out-of-React state change, not to derive state from props.
  useEffect(() => {
    if (!profile || !open) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- closing the modal in response to the external auth session becoming authenticated
    setOpen(false);
    const action = pendingRef.current;
    pendingRef.current = null;
    // Deferred so the freshly-loaded profile has propagated to the components
    // whose mutations the pending action calls.
    if (action) setTimeout(action, 0);
  }, [profile, open]);

  return (
    <AuthModalContext.Provider value={{ requireAuth, openLogin }}>
      {children}
      <LoginModal open={open} onClose={close} />
    </AuthModalContext.Provider>
  );
}

export function useAuthModal() {
  return useContext(AuthModalContext);
}
