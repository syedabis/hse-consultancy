import { NextResponse } from "next/server";

// Expose the current pathname to the root layout so it can pick the right
// page's <body> class and head CSS for the requested route.
export function middleware(req) {
  const headers = new Headers(req.headers);
  headers.set("x-pathname", req.nextUrl.pathname);
  return NextResponse.next({ request: { headers } });
}

export const config = {
  matcher: ["/((?!_next|wp-content|wp-includes|favicon.ico).*)"],
};
