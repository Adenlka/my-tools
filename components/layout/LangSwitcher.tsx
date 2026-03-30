'use client';

import { usePathname, useRouter } from 'next/navigation';

interface Props {
  currentLang: string;
}

export default function LangSwitcher({ currentLang }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  const switchLang = (newLang: string) => {
    if (newLang === currentLang) return;
    // Replace /en/ or /zh/ prefix with the new language
    const newPath = pathname.replace(/^\/(en|zh)/, `/${newLang}`);
    router.push(newPath);
  };

  return (
    <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-0.5">
      {(['en', 'zh'] as const).map((lang) => (
        <button
          key={lang}
          onClick={() => switchLang(lang)}
          className={`px-2.5 py-1 text-xs font-semibold rounded-md transition ${
            currentLang === lang
              ? 'bg-white text-indigo-600 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          {lang === 'en' ? 'EN' : '中文'}
        </button>
      ))}
    </div>
  );
}
