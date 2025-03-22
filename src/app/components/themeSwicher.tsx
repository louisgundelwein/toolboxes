// components/ThemeSwitcher.tsx
'use client';
import React, { useState, useEffect } from 'react';

const themes = [
  { label: 'Light', value: 'light' },
  { label: 'Dark', value: 'dark' },
  { label: 'Cyberpunk', value: 'cyberpunk' },
  { label: 'Darcula', value: 'darcula' },
  { label: 'Dim', value: 'dim' },
  { label: 'Nord', value: 'nord' },
];

const ThemeSwitcher: React.FC = () => {
  const [theme, setTheme] = useState<string>('dim');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className="dropdown dropdown-end dropdown-bottom">
      <div tabIndex={0} role="button" className="btn m-1">
        Theme
        <svg
          width="12px"
          height="12px"
          className="ml-1 inline-block h-2 w-2 fill-current opacity-60"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 2048 2048"
        >
          <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] w-52 rounded-box bg-base-300 p-2 shadow-2xl"
      >
        {themes.map((t) => (
          <li key={t.value}>
            <button
              onClick={() => setTheme(t.value)}
              className={`theme-controller btn btn-ghost btn-sm btn-block justify-start ${
                theme === t.value ? 'btn-active' : ''
              }`}
              aria-label={t.label}
            >
              {t.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThemeSwitcher;
