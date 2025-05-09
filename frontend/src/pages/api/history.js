export default async function handler(req, res) {
	if (req.method !== "GET") {
		return res.status(405).json({ error: "Method not allowed" });
	}

	try {
		// Make request to Flask backend
		const response = await fetch("http://localhost:5000/history");
		const data = await response.json();

		return res.status(200).json(data);
	} catch (error) {
		console.error("Error fetching history:", error);
		return res.status(500).json({ error: "Internal server error" });
	}
}
