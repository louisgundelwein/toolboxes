"use client";

import React from "react";

type BurgerProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const Burger: React.FC<BurgerProps> = ({ open, setOpen }) => {
  return (
    <button
      onClick={() => setOpen(!open)}
      className="fixed top-5 right-8 flex flex-col justify-around w-8 h-8 bg-transparent border-0 cursor-pointer p-0 z-[60] focus:outline-none"
    >
      <div
        className={`w-8 h-1 rounded transition-all duration-300 ${
          open ? "rotate-45 bg-secondary" : "bg-secondary"
        }`}
        style={{ transformOrigin: "1px" }}
      ></div>
      <div
        className={`w-8 h-1 rounded transition-all duration-300 ${
          open ? "opacity-0 translate-x-5 bg-secondary" : "bg-secondary"
        }`}
      ></div>
      <div
        className={`w-8 h-1 rounded transition-all duration-300 ${
          open ? "-rotate-45 bg-secondary" : "bg-secondary"
        }`}
        style={{ transformOrigin: "1px" }}
      ></div>
    </button>
  );
};

export default Burger;
