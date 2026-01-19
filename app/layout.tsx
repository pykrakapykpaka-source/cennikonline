import "@/styles/globals.css";
import localFont from "next/font/local";
import Script from "next/script";
import AOSInit from "@/components/AOS";
import { Providers } from "@/common/redux/Provider";
import ClientFormWrapper from "@/components/cta/ClientFormWrapper";
import { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { getSiteUrl } from "@/lib/siteUrl";
export default async function Root({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl" style={{ scrollBehavior: "smooth" }}>
      <body className={`${cocosharp.variable} ${gotham.variable}`}>
        <Providers>
          {children}
          <AOSInit />
        </Providers>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-10818390066"
        />
        <Script async id="google-analytics1">
          {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-10818390066');
          `}
        </Script>

        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-16664946086"
        />
        <Script async id="google-analytics2">
          {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-16664946086');
          `}
        </Script>

        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-TKFVWD1KMR"
        />
        <Script async id="google-analytics">
          {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-TKFVWD1KMR');
          `}
        </Script>
      </body>
    </html>
  );
}
export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#ffffff",
  manifest: "/manifest.json",
  title: "Zamów cennik online | Gotowe cenniki dla firm",
  description:
    "Cennik online, który sprzedaje: projekt, treści i wdrożenie w jednym. Zwiększ liczbę zapytań i zamykaj więcej klientów — dopasujemy cennik do Twojej branży.",
  openGraph: {
    type: "website",
    url: "/",
    title: "Zamów cennik online | Gotowe cenniki dla firm",
    description:
      "Cennik online, który sprzedaje: projekt, treści i wdrożenie w jednym. Zwiększ liczbę zapytań i zamykaj więcej klientów.",
    siteName: "Zamów cennik online",
  },
  authors: [{ name: "wesiu.dev", url: "https://wesiudev.netlify.app" }],
  publisher: "wesiu.dev",
  keywords:
    "cenniki online, sprzedaż cenników, cennik dla firm, cennik usług, gotowe cenniki, szablon cennika, cennik na stronę internetową, projekt cennika, wycena usług, cennik PDF",
  icons: [
    {
      url: "/favicons/apple-touch-icon.png",
      sizes: "180x180",
      type: "image/png",
    },
    {
      url: "/favicons/android-chrome-16x16.png",
      sizes: "16x16",
      type: "image/png",
    },
    {
      url: "/favicons/android-chrome-512x512.png",
      sizes: "512x512",
      type: "image/png",
    },
    {
      url: "/favicons/android-chrome-192x192.png",
      sizes: "192x192",
      type: "image/png",
    },
    {
      url: "/favicons/favicon-32x32.png",
      sizes: "32x32",
      type: "image/png",
    },
    {
      url: "/favicons/favicon.ico",
      sizes: "48x48",
      type: "image/x-icon",
    },
  ],
};

//font
const gotham = localFont({
  src: [
    {
      path: "../public/fonts/Gotham.ttf",
      weight: "400",
      style: "regular",
    },
    {
      path: "../public/fonts/Gotham-Light.ttf",
      weight: "300",
      style: "light",
    },
    {
      path: "../public/fonts/GothamBold.ttf",
      weight: "500",
      style: "bold",
    },
  ],
  variable: "--font-gotham",
});
const cocosharp = localFont({
  src: [
    {
      path: "../public/fonts/Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../public/fonts/Bold.ttf",
      weight: "700",
    },
    {
      path: "../public/fonts/ExtraLight.ttf",
      weight: "200",
    },
    {
      path: "../public/fonts/Light.ttf",
      weight: "300",
    },
    {
      path: "../public/fonts/LightItalic.ttf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../public/fonts/Regular.ttf",
      weight: "500",
    },
  ],
  variable: "--font-cocosharp",
});
