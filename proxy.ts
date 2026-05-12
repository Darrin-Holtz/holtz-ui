import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";
import { type NextRequest, NextResponse } from "next/server";

// Next.js 16 requires a named `proxy` export.
// Server Functions (Server Actions) are POST requests to the same route —
// they carry a `Next-Action` header that Next.js uses to dispatch them.
// We pass those through immediately so Next.js can validate and run them.
export async function proxy(request: NextRequest) {
  if (request.headers.get("Next-Action")) {
    return NextResponse.next();
  }

  return (withAuth as any)(
    async function proxy() {},
    {
      publicPaths: [
        "/",
        "/generator",
        "/product",
        "/product/*",
        "/products",
        "/products/*",
        "/api/uploadthing",
        "/api/uploadthing/*",
        "/api/stripe/connect",
        "/api/stripe",
        "/api/stripe/*",
        "/privacy",
        "/terms",
        "/refunds",
        "/dmca",
        "/search",
        "/sitemap.xml",
        "/robots.txt",
        "/api/admin/scan-files",
      ],
    }
  )(request);
}

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
  ],
};
