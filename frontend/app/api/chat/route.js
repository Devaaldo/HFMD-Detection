import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
	try {
		// Make request to Flask backend
		const response = await axios.get("http://localhost:5000/history", {
			headers: {
				Accept: "application/json",
			},
		});

		return NextResponse.json(response.data);
	} catch (error) {
		console.error("Error fetching history:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
