import { NextRequest, NextResponse } from "next/server";

const LOCALES = ["en", "zh", "ja"];
const DEFAULT_LOCALE = "en";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = LOCALES.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  if (hasLocale) return NextResponse.next();

  const acceptLang = request.headers.get("accept-language") || "";
  const preferred = acceptLang.split(",")[0].trim().toLowerCase();
  const locale = preferred.startsWith("zh") ? "zh" : preferred.startsWith("ja") ? "ja" : DEFAULT_LOCALE;

  return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
