import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SITE } from "@/constants/site";
import { getCategories } from "@/services/menu-service";
import { AppProviders } from "@/providers/app-providers";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

// Grobek — the 101 Bistro brand typeface. Self-hosted via next/font/local and
// used across the whole site for both body (--font-sans) and display headings
// (--font-display); see the theme mapping in globals.css.
const grobek = localFont({
  src: [
    { path: "./fonts/grobek/grobek-light.otf", weight: "300", style: "normal" },
    { path: "./fonts/grobek/grobek-regular.otf", weight: "400", style: "normal" },
    { path: "./fonts/grobek/grobek-medium.otf", weight: "500", style: "normal" },
    { path: "./fonts/grobek/grobek-bold.otf", weight: "700", style: "normal" },
    { path: "./fonts/grobek/grobek-black.otf", weight: "900", style: "normal" },
  ],
  variable: "--font-grobek",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    "101 Bistro",
    "restaurant menu",
    "digital menu",
    "bistro",
    SITE.address.city,
    "pasta",
    "pizza",
    "grill",
  ],
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    url: SITE.url,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
  },
  icons: { icon: "/favicon.ico" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbf8f4" },
    { media: "(prefers-color-scheme: dark)", color: "#140708" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const categories = await getCategories();

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${grobek.variable} antialiased`}
    >
      <body className="flex min-h-dvh flex-col bg-background text-foreground">
        <AppProviders categories={categories}>
          <SiteHeader categories={categories} />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </AppProviders>
      </body>
    </html>
  );
}
