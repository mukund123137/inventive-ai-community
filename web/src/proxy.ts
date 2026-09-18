import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Next.js 16 renamed `middleware.ts` to `proxy.ts` (same mechanism, new
 * name — see node_modules/next/dist/docs/01-app/01-getting-started/16-proxy.md).
 *
 * Two jobs: (1) refresh the Supabase session cookie on every request, the
 * standard @supabase/ssr pattern; (2) redirect unauthenticated visitors to
 * /login, since AppChrome renders every route except /login and
 * /reset-password with full app chrome and assumes a signed-in user.
 */
const CHROMELESS_ROUTES = ["/login", "/reset-password"];

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

  if (!user && !CHROMELESS_ROUTES.includes(request.nextUrl.pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|assets/).*)"],
};
