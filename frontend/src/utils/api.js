import axios from "axios";

// Create axios instance with default config
const api = axios.create({
	baseURL: "/api",
	headers: {
		"Content-Type": "application/json",
	},
});

export const uploadImage = async (file) => {
	const formData = new FormData();
	formData.append("file", file);

	try {
		const response = await axios.post("/api/upload", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
		return response.data;
	} catch (error) {
		console.error("Error uploading image:", error);
		throw error;
	}
};

export const getHistory = async () => {
	try {
		const response = await api.get("/history");
		return response.data;
	} catch (error) {
		console.error("Error fetching history:", error);
		throw error;
	}
};

export const sendChatMessage = async (message) => {
	try {
		const response = await api.post("/chat", { message });
		return response.data;
	} catch (error) {
		console.error("Error sending message:", error);
		throw error;
	}
};

export default api;
