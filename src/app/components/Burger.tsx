'use client';

import React from 'react';

type BurgerProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const Burger: React.FC<BurgerProps> = ({ open, setOpen }) => {
  return (
    <button
      onClick={() => setOpen(!open)}
      className="fixed right-8 top-5 z-[60] flex h-8 w-8 cursor-pointer flex-col justify-around border-0 bg-transparent p-0 focus:outline-none"
    >
      <div
        className={`h-1 w-8 rounded transition-all duration-300 ${
          open ? 'rotate-45 bg-secondary' : 'bg-secondary'
        }`}
        style={{ transformOrigin: '1px' }}
      ></div>
      <div
        className={`h-1 w-8 rounded transition-all duration-300 ${
          open ? 'translate-x-5 bg-secondary opacity-0' : 'bg-secondary'
        }`}
      ></div>
      <div
        className={`h-1 w-8 rounded transition-all duration-300 ${
          open ? '-rotate-45 bg-secondary' : 'bg-secondary'
        }`}
        style={{ transformOrigin: '1px' }}
      ></div>
    </button>
  );
};

export default Burger;
