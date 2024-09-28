import { getAuthor } from "@/action";
import { Cmdk } from "@/components/common/cmdk";
import { Navbar } from "@/components/common/navbar";
import { fontRoboto } from "@/config/fonts";
import routes from "@/config/routes.json";
import { siteConfig } from "@/config/site";
import { Locale } from "@/generated/graphql";
import "@/styles/globals.css";
import { __PROD__ } from "@/utils";
import { Analytics } from "@vercel/analytics/react";
import { clsx } from "clsx";
import "katex/dist/katex.min.css";
import type { Viewport } from "next";
import { Metadata } from "next";
import { Providers } from "./providers";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const author = await getAuthor(Locale.Es);
  // const defaultTheme = await getCookie("theme", "dark");

  return (
    <html suppressHydrationWarning dir="ltr" lang="es">
      <head />
      <body
        className={clsx(
          "scroll overflow-x-clip",
          "min-h-screen bg-background antialiased",
          fontRoboto.className
        )}
      >
        <Providers author={author as any}>
          <div className="relative flex flex-col" id="app-container">
            <Navbar mobileRoutes={routes.mobileRoutes} routes={routes.routes} />
            {children}
          </div>
          <Cmdk />
        </Providers>
        {__PROD__ && <Analytics />}
      </body>
    </html>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  //
  const author = await getAuthor(Locale.Es);
  const authorName = author?.firstName + " " + author?.lastName;
  return {
    metadataBase: new URL(siteConfig.siteUrl),
    title: {
      default: authorName,
      template: `${authorName} | %s`,
    },
    description: author?.bio?.toString(),
    authors: [
      {
        name: authorName,
        url: "/",
      },
    ],
    keywords: author?.keywords || [],
    creator: authorName,
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon-32x32.png",
      apple: "/apple-touch-icon.png",
    },
    manifest: "/manifest.json",
    openGraph: {
      type: "website",
      locale: "es_PE",
      siteName: "carloscb",
      title: authorName,
      description: author?.bio?.toString(),
      images: [
        {
          url: "/banner.png",
          width: 1540,
          height: 806,
          alt: authorName,
        },
      ],
    },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#eef6ff" },
    { media: "(prefers-color-scheme: dark)", color: "#07090e" },
  ],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};
