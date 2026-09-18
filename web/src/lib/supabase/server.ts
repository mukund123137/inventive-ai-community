import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Server-side Supabase client (Server Components, Route Handlers, Server
 * Actions). Not used by any screen today — every page in this app is a
 * Client Component — but available for future server-rendered data
 * fetching. `cookies()` is async in this Next.js version, so this factory
 * is async too.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
          } catch {
            // Called from a Server Component with no way to set cookies —
            // safe to ignore as long as middleware.ts is refreshing sessions.
          }
        },
      },
    }
  );
}
