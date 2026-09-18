import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Next.js 16 renamed `middleware.ts` to `proxy.ts` (same mechanism, new
 * name — see node_modules/next/dist/docs/01-app/01-getting-started/16-proxy.md).
 *
 * Two jobs: (1) refresh the Supabase session cookie on every request, the
 * standard @supabase/ssr pattern; (2) gate only the routes that truly need an
 * account. The Q&A community is public — anyone can browse the feed, search,
 * read questions/answers, and view public profiles without signing in. Only
 * account pages (Ask, Notifications, Settings, Profile) and Admin require auth;
 * an unauthenticated hit on those is redirected to /login. All write access is
 * still enforced by Supabase RLS regardless of this check.
 */

/** Routes anyone can view signed out. Everything else requires a session. */
function isPublicPath(pathname: string): boolean {
  if (pathname === "/" || pathname === "/search") return true;
  if (pathname === "/login" || pathname === "/reset-password") return true;
  if (pathname.startsWith("/questions/") || pathname.startsWith("/u/")) return true;
  return false;
}

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && !isPublicPath(request.nextUrl.pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|assets/).*)"],
};
