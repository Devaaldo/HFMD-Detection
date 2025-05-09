"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiMenu, HiX } from "react-icons/hi";

export default function Navbar() {
	const [isOpen, setIsOpen] = useState(false);
	const pathname = usePathname();

	const isActive = (path) => pathname === path;

	const navLinks = [
		{ name: "Home", href: "/" },
		{ name: "History", href: "/history" },
		{ name: "Chatbot", href: "/chatbot" },
	];

	return (
		<nav className="bg-white shadow-md">
			<div className="container mx-auto px-4 md:px-6">
				<div className="flex justify-between h-16">
					<div className="flex">
						<div className="flex-shrink-0 flex items-center">
							<Link href="/" className="font-bold text-xl text-primary-600">
								HFMD Detection
							</Link>
						</div>
						<div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
							{navLinks.map((link) => (
								<Link
									key={link.name}
									href={link.href}
									className={`px-3 py-2 rounded-md text-sm font-medium ${
										isActive(link.href)
											? "bg-primary-50 text-primary-700"
											: "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
									}`}
								>
									{link.name}
								</Link>
							))}
						</div>
					</div>

					<div className="flex items-center md:hidden">
						<button
							onClick={() => setIsOpen(!isOpen)}
							className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
						>
							{isOpen ? (
								<HiX className="h-6 w-6" />
							) : (
								<HiMenu className="h-6 w-6" />
							)}
						</button>
					</div>
				</div>
			</div>

			{/* Mobile menu */}
			{isOpen && (
				<div className="md:hidden">
					<div className="px-2 pt-2 pb-3 space-y-1">
						{navLinks.map((link) => (
							<Link
								key={link.name}
								href={link.href}
								className={`block px-3 py-2 rounded-md text-base font-medium ${
									isActive(link.href)
										? "bg-primary-50 text-primary-700"
										: "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
								}`}
								onClick={() => setIsOpen(false)}
							>
								{link.name}
							</Link>
						))}
					</div>
				</div>
			)}
		</nav>
	);
}
