import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { join } from "path";
import axios from "axios";

export async function POST(request) {
	try {
		const formData = await request.formData();
		const file = formData.get("file");

		if (!file) {
			return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
		}

		// Kirim file ke backend Flask
		const flaskFormData = new FormData();
		const fileBuffer = await file.arrayBuffer();
		const blob = new Blob([Buffer.from(fileBuffer)]);
		flaskFormData.append("file", blob, file.name);

		// Kirim ke Flask backend
		const response = await axios.post("http://localhost:5000/", flaskFormData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});

		return NextResponse.json(response.data);
	} catch (error) {
		console.error("Error processing upload:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
