// components/NavBar.tsx
'use client';

import Link from 'next/link';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeSwitcher from './themeSwicher';
import ToolsDropdown from './toolsDropdown';
import Logo from '../../../public/logo';

const NavBar: React.FC = () => {
	return (
		<nav className="w-full bg-neutral text-white px-4 py-3 flex justify-between items-center">
			<Link className="link link-hover text-xl text-neutral-content" href="/">
				<Logo 
					fill="#ffffff" 
					height="40px" 
          width="40px"
				/>
			</Link>
			<div className="flex flex-row">
				<ToolsDropdown />
				<ThemeSwitcher />
				<LanguageSwitcher />
			</div>
		</nav>
	);
};

export default NavBar;
