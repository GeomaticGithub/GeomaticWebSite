import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define valid locales - keeping this local to avoid import issues in middleware
const validLocales = ["en-ma", "fr-ma"];
const defaultLocale = "en-ma";

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // Redirect root path to default locale
  if (pathname === "/") {
    return NextResponse.redirect(new URL(`/${defaultLocale}`, req.url));
  }

  // Check if pathname starts with a valid locale
  const pathnameHasValidLocale = validLocales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // If pathname doesn't start with a valid locale, redirect to default locale
  if (!pathnameHasValidLocale) {
    // Extract the path after the invalid locale (if any)
    const segments = pathname.split("/");
    if (segments.length > 1 && segments[1] !== "") {
      // Check if the first segment looks like an invalid locale pattern
      const firstSegment = segments[1];
      // If it looks like a locale but isn't valid ("fr", "fr-fr", "en-us", "xx-yy"...),
      // redirect to the supported locale for that language, else to the default one.
      const looksLikeLocale =
        /^[a-z]{2}$/i.test(firstSegment) ||
        (firstSegment.length === 5 && firstSegment.includes("-"));
      if (looksLikeLocale) {
        const lang = firstSegment.slice(0, 2).toLowerCase();
        const target =
          validLocales.find((l) => l.startsWith(`${lang}-`)) ?? defaultLocale;
        const rest = segments.slice(2).join("/");
        const url = new URL(`/${target}${rest ? `/${rest}` : ""}`, req.url);
        url.search = req.nextUrl.search; // keep query string
        return NextResponse.redirect(url);
      }
    }
  }
}

export const config = {
  matcher: [
    // Match all paths except API routes, static files, and Next.js internals
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
