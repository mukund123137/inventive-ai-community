"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { User } from "@supabase/supabase-js";
import { createClient } from "./supabase/client";
import type { ProfileRow } from "./supabase/database.types";

interface AuthState {
  userId: string | null;
  user: User | null;
  profile: ProfileRow | null;
  loading: boolean;
}

const AuthContext = createContext<AuthState>({ userId: null, user: null, profile: null, loading: true });

/**
 * Replaces the mock's hardcoded `ME` constant with the real signed-in
 * user's session + profile row. Every component that used to import `ME`/
 * `AUTHORS[ME]` from mock-data now calls useAuth() instead.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({ userId: null, user: null, profile: null, loading: true });

  useEffect(() => {
    const supabase = createClient();
    let active = true;

    async function loadProfile(user: User | null) {
      if (!user) {
        if (active) setState({ userId: null, user: null, profile: null, loading: false });
        return;
      }
      const { data } = await supabase.from("profiles").select("*").eq("user_id", user.id).maybeSingle();
      if (active) setState({ userId: user.id, user, profile: (data as ProfileRow) ?? null, loading: false });
    }

    supabase.auth.getUser().then(({ data }) => loadProfile(data.user ?? null));

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      loadProfile(session?.user ?? null);
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
