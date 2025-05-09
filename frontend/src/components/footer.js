export default function Footer() {
	return (
		<footer className="bg-white shadow-inner">
			<div className="container mx-auto px-4 py-6 md:px-6">
				<div className="flex flex-col md:flex-row justify-between items-center">
					<p className="text-gray-500 text-sm">
						&copy; {new Date().getFullYear()} HFMD Detection System
					</p>
					<div className="mt-2 md:mt-0">
						<p className="text-gray-500 text-sm">
							Powered by Next.js, Tailwind CSS, and Flask
						</p>
					</div>
				</div>
			</div>
		</footer>
	);
}
