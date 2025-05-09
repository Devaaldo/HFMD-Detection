import "./globals.css";
import { Inter } from "next/font/google";
import Script from "next/script";

// Definisikan font Inter dengan subset Latin
const inter = Inter({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-inter",
});

export const metadata = {
	title: "HFMD Detection System",
	description:
		"Sistem deteksi Hand, Foot, and Mouth Disease menggunakan machine learning",
};

export default function RootLayout({ children }) {
	return (
		<html lang="id" className={inter.variable}>
			<head>
				{/* Tambahkan CDN Tailwind jika build tidak berfungsi */}
				<link
					href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
					rel="stylesheet"
				/>
			</head>
			<body className="flex flex-col min-h-screen bg-gray-50">
				<nav className="bg-white shadow-md">
					<div className="container mx-auto px-4 py-4 md:px-6">
						<div className="flex justify-between items-center">
							<a href="/" className="font-bold text-xl text-blue-600">
								HFMD Detection
							</a>
							<div className="hidden md:flex space-x-4">
								<a
									href="/"
									className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
								>
									Home
								</a>
								<a
									href="/history"
									className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
								>
									History
								</a>
								<a
									href="/chatbot"
									className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
								>
									Chatbot
								</a>
							</div>
						</div>
					</div>
				</nav>

				<main className="flex-grow container mx-auto px-4 py-8 md:px-6">
					{children}
				</main>

				<footer className="bg-white shadow-inner">
					<div className="container mx-auto px-4 py-6 md:px-6">
						<div className="flex flex-col md:flex-row justify-between items-center">
							<p className="text-gray-500 text-sm">
								&copy; {new Date().getFullYear()} HFMD Detection System
							</p>
							<div className="mt-2 md:mt-0">
								<p className="text-gray-500 text-sm">
									Powered by Bagas Dwi Santosa & Muhammad Akbar Pradana
								</p>
							</div>
						</div>
					</div>
				</footer>
			</body>
		</html>
	);
}
