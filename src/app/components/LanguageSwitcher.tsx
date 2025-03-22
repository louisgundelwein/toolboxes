// components/LanguageSwitcher.tsx
"use client";

import { LOCALES } from "@/shared";
import { useRouter, usePathname } from "next/navigation";
import { useMemo } from "react";

const LANGUAGE_NAMES: { [key: string]: string } = {
  en: "English",
  de: "Deutsch",
  fr: "Français",
  es: "Español",
  uk: "Українська",
  zh: "中文",
  pt: "Português",
};

const LanguageSwitcher: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const segments = useMemo(
    () => pathname.split("/").filter(Boolean),
    [pathname],
  );

  const currentLocale =
    segments.length > 0 && LOCALES.includes(segments[0]) ? segments[0] : "de";

  const switchLanguage = (newLocale: string) => {
    let newPath = "";
    if (segments.length > 0 && LOCALES.includes(segments[0])) {
      newPath = "/" + [newLocale, ...segments.slice(1)].join("/");
    } else {
      newPath = "/" + [newLocale, ...segments].join("/");
    }
    router.push(newPath);
  };

  return (
    <div className="dropdown dropdown-bottom dropdown-start">
      <div
        tabIndex={0}
        role="button"
        className="btn m-1 flex items-center justify-between"
      >
        {LANGUAGE_NAMES[currentLocale] || currentLocale.toUpperCase()}
        <svg
          width="12px"
          height="12px"
          className="ml-2 inline-block h-2 w-2 fill-current opacity-60"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 2048 2048"
        >
          <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-300 rounded-box z-[1] p-2 shadow-2xl"
      >
        {LOCALES.map((locale) => (
          <li key={locale}>
            <button
              onClick={() => switchLanguage(locale)}
              className="btn btn-ghost btn-sm w-full text-left"
            >
              {LANGUAGE_NAMES[locale] || locale.toUpperCase()}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LanguageSwitcher;
