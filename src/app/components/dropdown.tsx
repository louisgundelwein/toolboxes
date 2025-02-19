// components/Dropdown.tsx
'use client';
import React from 'react';
import Link from 'next/link';

export interface DropdownItem {
	label: string;
	href?: string;
	onClick?: () => void;
}

export interface DropdownProps {
	label: string;
	items: DropdownItem[];
	containerClassName?: string;
	buttonClassName?: string;
	menuClassName?: string;
	showArrow?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({
	label,
	items,
	containerClassName = 'dropdown dropdown-bottom dropdown-middle',
	buttonClassName = 'btn m-1',
	menuClassName = 'dropdown-content bg-base-300 rounded-box z-[1] w-52 p-2 shadow-2xl',
	showArrow = true,
}) => {
	return (
		<div className={containerClassName}>
			<div tabIndex={0} role="button" className={buttonClassName}>
				{label}
				{showArrow && (
					<svg
						width="12px"
						height="12px"
						className="inline-block h-2 w-2 fill-current opacity-60 ml-1"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 2048 2048"
					>
						<path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
					</svg>
				)}
			</div>
			<ul tabIndex={0} className={menuClassName}>
				{items.map((item, index) => (
					<li key={index}>
						{item.href ? (
							<Link href={item.href}>
								<span className="btn btn-sm btn-block btn-ghost justify-start">
									{item.label}
								</span>
							</Link>
						) : (
							<button
								onClick={item.onClick}
								className="btn btn-sm btn-block btn-ghost justify-start"
							>
								{item.label}
							</button>
						)}
					</li>
				))}
			</ul>
		</div>
	);
};

export default Dropdown;
