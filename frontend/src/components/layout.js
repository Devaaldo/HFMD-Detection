import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children, title = "HFMD Detection System" }) {
	return (
		<div className="flex flex-col min-h-screen bg-gray-50">
			<Head>
				<title>{title}</title>
				<meta name="description" content="HFMD Detection System" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Navbar />

			<main className="flex-grow container mx-auto px-4 py-8 md:px-6">
				{children}
			</main>

			<Footer />
		</div>
	);
}
