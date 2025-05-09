export default async function handler(req, res) {
	if (req.method !== "POST") {
		return res.status(405).json({ error: "Method not allowed" });
	}

	try {
		const { message } = req.body;

		if (!message) {
			return res.status(400).json({ error: "No message provided" });
		}

		// Send to Flask backend
		const response = await fetch("http://localhost:5000/chatbot", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ message }),
		});

		const data = await response.json();
		return res.status(200).json(data);
	} catch (error) {
		console.error("Error sending chat message:", error);
		return res.status(500).json({ error: "Internal server error" });
	}
}
