import type { Metadata } from "next";
import { Inter } from "next/font/google";
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
  return [{ lang: "en" }, { lang: "zh" }];
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
  };
}

export default async function LangLayout({ children, params }: Props) {
  const { lang } = await params;
  const validLang = lang === "zh" ? "zh" : "en";

  return (
    <html lang={validLang}>
      <body className={`${inter.className} bg-gray-50 text-gray-900 min-h-screen flex flex-col`}>
        <Navbar lang={validLang} />
        <div className="flex-1">{children}</div>
        <Footer lang={validLang} />
      </body>
    </html>
  );
}
