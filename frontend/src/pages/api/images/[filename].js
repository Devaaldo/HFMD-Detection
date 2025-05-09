export default async function handler(req, res) {
	if (req.method !== "GET") {
		return res.status(405).json({ error: "Method not allowed" });
	}

	try {
		const { filename } = req.query;

		if (!filename) {
			return res.status(400).json({ error: "No filename provided" });
		}

		// Forward request to Flask backend
		const response = await fetch(
			`http://localhost:5000/static/uploads/${filename}`
		);

		if (!response.ok) {
			return res.status(404).json({ error: "Image not found" });
		}

		const imageBuffer = await response.arrayBuffer();

		// Set appropriate content type
		const contentType = response.headers.get("content-type") || "image/jpeg";
		res.setHeader("Content-Type", contentType);

		return res.status(200).send(Buffer.from(imageBuffer));
	} catch (error) {
		console.error("Error fetching image:", error);
		return res.status(500).json({ error: "Internal server error" });
	}
}
