'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Logo from '../../../public/logo';
import Burger from './Burger';
import Menu from './Menu';

function useOnClickOutside(
  ref: React.RefObject<HTMLDivElement | null>,
  handler: (event: MouseEvent) => void
) {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      // Wenn der Klick im Container stattfindet, nichts tun
      if (!ref.current || ref.current.contains(event.target as Node)) return;
      handler(event);
    };
    document.addEventListener('mousedown', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
    };
  }, [ref, handler]);
}

const NavBar: React.FC = () => {
  const [open, setOpen] = useState(false);
  // Gemeinsamer Container für Burger und Menü
  const containerRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(containerRef, () => setOpen(false));

  return (
    <nav className="relative flex w-full items-center justify-between bg-neutral px-4 py-3 text-white">
      <Link href="/">
        <Logo fill="white" height="40px" width="40px" />
      </Link>
      {/* Gemeinsamer Container für Button und Menü */}
      <div ref={containerRef} className="relative">
        <Burger open={open} setOpen={setOpen} />
        <Menu open={open} />
      </div>
    </nav>
  );
};

export default NavBar;
