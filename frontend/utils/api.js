"use client";

import axios from "axios";

// Buat instance axios dengan konfigurasi default
const api = axios.create({
	baseURL: "http://localhost:5000",
	headers: {
		"Content-Type": "application/json",
	},
});

export const uploadImage = async (file) => {
	const formData = new FormData();
	formData.append("file", file);

	try {
		const response = await axios.post("http://localhost:5000/", formData, {
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

export default api;
