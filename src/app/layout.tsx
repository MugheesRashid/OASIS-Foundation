import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Providers } from "@/components/layout/Providers";
import { EmberRail } from "@/components/layout/EmberRail";
import { MouseFollower } from "@/components/layout/MouseFollower";
import { site } from "@/lib/data";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.fullName} — ${site.tagline}`,
    template: `%s — ${site.fullName}`,
  },
  description: site.description,
  keywords: [
    "OASIS Foundation",
    "Pakistan youth empowerment",
    "student volunteer Pakistan",
    "free mentorship Pakistan",
    "career guidance students",
    "campus workshops Pakistan",
  ],
  authors: [{ name: site.fullName, url: site.url }],
  openGraph: {
    type: "website",
    url: site.url,
    title: `${site.fullName} — ${site.tagline}`,
    description: site.description,
    siteName: site.fullName,
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.fullName} — ${site.tagline}`,
    description: site.description,
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: site.url },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#050a0e" },
    { media: "(prefers-color-scheme: light)", color: "#faf8f4" },
  ],
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: site.fullName,
  url: site.url,
  description: site.description,
  foundingDate: "2026-05-24",
  sameAs: [
    "https://www.instagram.com/oasis_foundationn",
    "https://x.com/oasisfound22",
    "https://www.facebook.com/people/Oasis-Foundation/61590852688772/",
    "https://www.tiktok.com/@oasisfoundation22",
  ],
};

const themeInitScript = `
(function() {
  try {
    var stored = localStorage.getItem('theme');
    var theme = stored || 'dark';
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="dark" className="h-full" suppressHydrationWarning>
      <head suppressHydrationWarning>
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full font-body antialiased bg-ink text-paper">
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
        <Providers>
          {/* Overlays rendered globally away from structural layout container */}
          <EmberRail />
          <MouseFollower />
          
          {/* Main App structural wrapper */}
          <div className="flex flex-col min-h-screen">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}