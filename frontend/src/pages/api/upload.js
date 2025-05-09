import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import formidable from "formidable";
import fs from "fs";
import path from "path";

// Disable bodyParser to handle file uploads
export const config = {
	api: {
		bodyParser: false,
	},
};

export default async function handler(req, res) {
	if (req.method !== "POST") {
		return res.status(405).json({ error: "Method not allowed" });
	}

	// Parse form with formidable
	const form = new formidable.IncomingForm();
	form.keepExtensions = true;

	try {
		const { fields, files } = await new Promise((resolve, reject) => {
			form.parse(req, (err, fields, files) => {
				if (err) reject(err);
				resolve({ fields, files });
			});
		});

		const file = files.file;

		if (!file) {
			return res.status(400).json({ error: "No file uploaded" });
		}

		// Create form data for Flask backend
		const formData = new FormData();
		const fileBuffer = fs.readFileSync(file.filepath);

		// Append file to form data
		formData.append("file", new Blob([fileBuffer]), file.originalFilename);

		// Send to Flask backend
		const response = await axios.post("http://localhost:5000/", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});

		return res.status(200).json(response.data);
	} catch (error) {
		console.error("Error processing upload:", error);
		return res.status(500).json({ error: "Internal server error" });
	}
}
