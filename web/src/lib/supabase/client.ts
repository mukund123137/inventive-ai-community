import { createBrowserClient } from "@supabase/ssr";

/**
 * Browser-side Supabase client. This is what every "use client" component
 * in the app uses (the whole UI is client components today — see
 * docs/supabase-integration-plan.md). Safe to call repeatedly; the
 * underlying client is a singleton.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
