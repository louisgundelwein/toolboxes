"use client";

import React from "react";

// Hier sind Platzhalter – ersetze sie durch deine echten Komponenten
import ToolsDropdown from "./toolsDropdown";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeSwitcher from "./themeSwicher";

type MenuProps = {
  open: boolean;
};

const Menu: React.FC<MenuProps> = ({ open }) => {
  return (
    <nav
      className={`fixed top-0 right-0 h-screen w-64 bg-primary p-8 transition-transform duration-300 z-30 ${
        open ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex flex-col space-y-4">
        <ToolsDropdown />
        <ThemeSwitcher />
        <LanguageSwitcher />
      </div>
    </nav>
  );
};

export default Menu;
