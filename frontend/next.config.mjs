/** @type {import('next').NextConfig} */
const nextConfig = {
	// Enable image domains for local development
	images: {
		domains: ["localhost"],
	},

	// Rewrite API routes to Flask backend
	async rewrites() {
		return [
			{
				source: "/api/image/:path*",
				destination: "http://localhost:5000/static/uploads/:path*",
			},
		];
	},

	// Experimental features if needed
	experimental: {
		// App Router is no longer experimental in Next.js 13.4+
		// You can add other experimental features here if needed
	},
};

export default nextConfig;
