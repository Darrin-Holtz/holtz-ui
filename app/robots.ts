import type { MetadataRoute } from "next";

const APP_URL = "https://holtzdigitalui.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/dashboard",
          "/settings",
          "/billing",
          "/sell",
          "/my-products",
          "/my-purchases",
          "/payment/",
          "/return/",
          "/download/",
          "/test",
        ],
      },
    ],
    sitemap: `${APP_URL}/sitemap.xml`,
  };
}
