import { NextResponse } from "next/server";

export async function GET(request, { params }) {
	try {
		const { filename } = params;

		if (!filename) {
			return NextResponse.json(
				{ error: "No filename provided" },
				{ status: 400 }
			);
		}

		// Gunakan rewrites yang didefinisikan di next.config.js untuk proxy ke Flask
		// Ini hanya mengembalikan URL ke gambar
		const imageUrl = `/static/uploads/${filename}`;

		return NextResponse.json({ url: imageUrl });
	} catch (error) {
		console.error("Error fetching image:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
