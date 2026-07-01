import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { SITE } from "@/constants/site";
import { getCategories } from "@/services/menu-service";
import { getLocale } from "@/lib/locale-server";
import { localeDir } from "@/lib/locale";
import { AppProviders } from "@/providers/app-providers";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  weight: ["400", "500", "600", "700"],
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
  // Lock zoom on phones (no pinch-to-zoom / double-tap zoom).
  maximumScale: 1,
  userScalable: false,
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [locale, categories] = await Promise.all([getLocale(), getCategories()]);
  const dir = localeDir(locale);

  return (
    <html
      lang={locale}
      dir={dir}
      suppressHydrationWarning
      className={`${inter.variable} ${fraunces.variable} antialiased`}
    >
      <body className="flex min-h-dvh flex-col bg-background text-foreground">
        {/* React hoists these into <head>. Loads Google Material Symbols for the
            data-driven category icons. Axes are pinned to the single values we
            actually render (opsz 24, wght 400, FILL 0, GRAD 0) — this serves a
            ~320 KB static font instead of the ~4 MB variable one. `display=block`
            avoids briefly flashing the raw ligature text before the font loads. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          precedence="default"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=block"
        />
        <AppProviders categories={categories} locale={locale}>
          <SiteHeader categories={categories} locale={locale} />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </AppProviders>
      </body>
    </html>
  );
}
