'use client';

import Link from 'next/link';
import { useState } from 'react';
import LangSwitcher from '@/components/layout/LangSwitcher';
import { getDict } from '@/lib/i18n';

interface Props {
  lang: string;
}

export default function Navbar({ lang }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const dict = getDict(lang);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={`/${lang}`} className="flex items-center gap-2 font-bold text-xl text-indigo-600">
            <span>🛠️</span>
            <span>MyTools</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
            <Link href={`/${lang}`} className="hover:text-indigo-600 transition-colors">{dict.nav.home}</Link>
            <Link href={`/${lang}/about`} className="hover:text-indigo-600 transition-colors">{dict.nav.about}</Link>
            <Link href={`/${lang}/privacy`} className="hover:text-indigo-600 transition-colors">{dict.nav.privacy}</Link>
            <LangSwitcher currentLang={lang} />
          </nav>

          {/* Mobile: lang switcher + hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <LangSwitcher currentLang={lang} />
            <button
              className="p-2 rounded-md text-gray-500 hover:bg-gray-100"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <nav className="md:hidden py-3 border-t border-gray-100 flex flex-col gap-2 text-sm font-medium text-gray-600">
            <Link href={`/${lang}`} className="px-2 py-1 hover:text-indigo-600" onClick={() => setMenuOpen(false)}>{dict.nav.home}</Link>
            <Link href={`/${lang}/about`} className="px-2 py-1 hover:text-indigo-600" onClick={() => setMenuOpen(false)}>{dict.nav.about}</Link>
            <Link href={`/${lang}/privacy`} className="px-2 py-1 hover:text-indigo-600" onClick={() => setMenuOpen(false)}>{dict.nav.privacy}</Link>
          </nav>
        )}
      </div>
    </header>
  );
}
