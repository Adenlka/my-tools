import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "../globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getDict } from "@/lib/i18n";

const inter = Inter({ subsets: ["latin"] });

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
    title: {
      default: `MyTools – ${dict.home.title}`,
      template: `%s | MyTools`,
    },
    description: dict.home.subtitle,
    other: {
      "google-adsense-account": "ca-pub-6958229347848986",
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
