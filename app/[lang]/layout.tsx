import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "../globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getDict } from "@/lib/i18n";

const inter = Inter({ subsets: ["latin"] });

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://alka003.xyz";

interface Props {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "zh" }, { lang: "ja" }];
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = getDict(lang);
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: `MyTools – ${dict.home.title}`,
      template: `%s | MyTools`,
    },
    description: dict.home.subtitle,
    other: {
      "google-adsense-account": "ca-pub-6958229347848986",
    },
    openGraph: {
      siteName: "MyTools",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      site: "@mytools",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
    },
  };
}

export default async function LangLayout({ children, params }: Props) {
  const { lang } = await params;
  const validLang = lang === "zh" ? "zh" : lang === "ja" ? "ja" : "en";

  return (
    <html lang={validLang}>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6958229347848986"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      <body className={`${inter.className} bg-gray-50 text-gray-900 min-h-screen flex flex-col`}>
        <Navbar lang={validLang} />
        <div className="flex-1">{children}</div>
        <Footer lang={validLang} />
      </body>
    </html>
  );
}
