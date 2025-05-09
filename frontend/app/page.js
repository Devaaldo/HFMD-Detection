"use client";

import { useState } from "react";
import axios from "axios";

export default function HomePage() {
	const [file, setFile] = useState(null);
	const [preview, setPreview] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [result, setResult] = useState(null);

	const handleFileChange = (e) => {
		const selectedFile = e.target.files[0];
		if (!selectedFile) return;

		// Validate file type
		const validTypes = ["image/jpeg", "image/jpg", "image/png"];
		if (!validTypes.includes(selectedFile.type)) {
			setError("Please select a valid image file (JPG, JPEG, or PNG)");
			return;
		}

		setError(null);
		setFile(selectedFile);
		setPreview(URL.createObjectURL(selectedFile));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!file) {
			setError("Please select an image first");
			return;
		}

		setIsLoading(true);
		setError(null);

		const formData = new FormData();
		formData.append("file", file);

		try {
			console.log("Sending request to Flask server...");

			// Gunakan URL Flask yang benar
			const response = await axios.post("http://localhost:5000/", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});

			console.log("Response:", response.data);
			setResult(response.data);
		} catch (err) {
			console.error("Upload error:", err);

			if (err.response) {
				setError(
					`Server error (${err.response.status}): ${
						err.response.data.error || "Unknown error"
					}`
				);
			} else if (err.request) {
				setError(
					"No response from server. Please check if the Flask server is running."
				);
			} else {
				setError(`Error: ${err.message}`);
			}
		} finally {
			setIsLoading(false);
		}
	};

	const testConnection = async () => {
		try {
			const response = await axios.get("http://localhost:5000/");
			console.log("Connection test:", response);
			alert("Successfully connected to Flask server!");
		} catch (err) {
			console.error("Connection test failed:", err);
			alert(`Failed to connect to Flask server: ${err.message}`);
		}
	};

	return (
		<div className="max-w-4xl mx-auto">
			<div className="text-center mb-8">
				<h1 className="text-3xl font-bold text-gray-900 mb-2">
					HFMD Detection System
				</h1>
				<p className="text-gray-600 text-lg mb-2">
					Upload gambar untuk mendeteksi Hand, Foot, and Mouth Disease
				</p>
				<button
					onClick={testConnection}
					className="text-sm text-blue-600 hover:underline"
				></button>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				<div>
					<div className="bg-white shadow-md rounded-lg p-6">
						<h2 className="text-xl font-semibold text-gray-800 mb-4">
							Upload Gambar
						</h2>

						<form onSubmit={handleSubmit}>
							<div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition cursor-pointer">
								<input
									type="file"
									id="image-upload"
									className="hidden"
									accept="image/jpeg,image/jpg,image/png"
									onChange={handleFileChange}
									disabled={isLoading}
								/>

								<label htmlFor="image-upload" className="cursor-pointer block">
									{preview ? (
										<img
											src={preview}
											alt="Preview"
											className="max-w-full h-auto max-h-64 mx-auto rounded"
										/>
									) : (
										<>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="mx-auto h-12 w-12 text-gray-400"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
												/>
											</svg>
											<p className="mt-2 text-sm text-gray-600">
												Click to select an image
											</p>
											<p className="mt-1 text-xs text-gray-500">
												PNG, JPG, JPEG up to 10MB
											</p>
										</>
									)}
								</label>
							</div>

							{error && (
								<div className="mt-4 bg-red-50 border-l-4 border-red-400 p-4 rounded-md">
									<p className="text-sm text-red-700">{error}</p>
								</div>
							)}

							<button
								type="submit"
								disabled={!file || isLoading}
								className={`mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 flex items-center justify-center ${
									!file || isLoading ? "opacity-50 cursor-not-allowed" : ""
								}`}
							>
								{isLoading ? (
									<>
										<svg
											className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
										>
											<circle
												className="opacity-25"
												cx="12"
												cy="12"
												r="10"
												stroke="currentColor"
												strokeWidth="4"
											></circle>
											<path
												className="opacity-75"
												fill="currentColor"
												d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
											></path>
										</svg>
										Processing...
									</>
								) : (
									"Detect HFMD"
								)}
							</button>
						</form>
					</div>

					<div className="mt-6 bg-white shadow-md rounded-lg p-6">
						<h2 className="text-xl font-semibold text-gray-800 mb-4">
							Tentang HFMD
						</h2>
						<div className="prose text-gray-600">
							<p>
								Hand, Foot, and Mouth Disease (HFMD) adalah penyakit virus
								menular yang umum terjadi pada bayi dan anak-anak.
							</p>
							<h3 className="text-lg font-medium text-gray-800 mt-4">
								Gejala Umum:
							</h3>
							<ul className="list-disc pl-5 space-y-1">
								<li>Demam</li>
								<li>Sakit tenggorokan</li>
								<li>Ruam pada tangan, kaki, dan mulut</li>
								<li>Lepuhan di mulut</li>
								<li>Menurunnya nafsu makan</li>
							</ul>
							<h3 className="text-lg font-medium text-gray-800 mt-4">
								Pencegahan:
							</h3>
							<ul className="list-disc pl-5 space-y-1">
								<li>Mencuci tangan secara teratur</li>
								<li>Menghindari kontak dengan orang yang terinfeksi</li>
								<li>Membersihkan permukaan yang sering disentuh</li>
								<li>Tidak berbagi peralatan makan dan minum</li>
							</ul>
						</div>
					</div>
				</div>

				<div>
					<div className="bg-white shadow-md rounded-lg p-6">
						<h2 className="text-xl font-semibold text-gray-800 mb-4">
							Hasil Deteksi
						</h2>

						{result ? (
							<div>
								<div
									className={`border-l-4 rounded-lg p-4 ${
										result.result === "HFMD"
											? "border-l-red-500 bg-red-50"
											: "border-l-green-500 bg-green-50"
									}`}
								>
									<div className="flex items-center">
										<div
											className={`flex-shrink-0 rounded-full p-1 ${
												result.result === "HFMD"
													? "bg-red-100 text-red-500"
													: "bg-green-100 text-green-500"
											}`}
										>
											{result.result === "HFMD" ? (
												<svg
													xmlns="http://www.w3.org/2000/svg"
													className="h-6 w-6"
													fill="none"
													viewBox="0 0 24 24"
													stroke="currentColor"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
													/>
												</svg>
											) : (
												<svg
													xmlns="http://www.w3.org/2000/svg"
													className="h-6 w-6"
													fill="none"
													viewBox="0 0 24 24"
													stroke="currentColor"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M5 13l4 4L19 7"
													/>
												</svg>
											)}
										</div>
										<h3 className="ml-3 text-lg font-semibold text-gray-800">
											{result.detailed_result.title}
										</h3>
									</div>

									<div className="mt-4">
										<div className="flex items-center mb-3">
											<div className="w-full bg-gray-200 rounded-full h-2.5">
												<div
													className={`h-2.5 rounded-full ${
														result.result === "HFMD"
															? "bg-red-500"
															: "bg-green-500"
													}`}
													style={{
														width: result.confidence,
													}}
												></div>
											</div>
											<span className="ml-3 text-sm font-medium">
												{result.confidence}{" "}
												{result.result === "HFMD" ? "HFMD" : "Non-HFMD"}
											</span>
										</div>

										<div className="flex items-center mb-3">
											<span className="text-sm font-semibold text-gray-700 mr-2">
												Severity:
											</span>
											<span
												className={`px-2 py-1 text-xs rounded-full font-semibold ${
													result.detailed_result.severity === "tinggi"
														? "bg-red-100 text-red-700"
														: result.detailed_result.severity === "sedang"
														? "bg-yellow-100 text-yellow-700"
														: result.detailed_result.severity === "ringan"
														? "bg-orange-100 text-orange-700"
														: "bg-green-100 text-green-700"
												}`}
											>
												{result.detailed_result.severity}
											</span>
										</div>

										<div className="mt-4">
											<p className="text-sm text-gray-600 whitespace-pre-line">
												{result.detailed_result.description}
											</p>
										</div>

										{result.image_data && (
											<div className="mt-4">
												<p className="text-sm font-medium text-gray-700 mb-2">
													Uploaded Image:
												</p>
												<img
													src={`data:image/jpeg;base64,${result.image_data}`}
													alt="Uploaded"
													className="max-w-full h-auto rounded border border-gray-200"
												/>
											</div>
										)}
									</div>
								</div>

								<div className="mt-4 flex justify-end">
									<button
										type="button"
										onClick={() => {
											setFile(null);
											setPreview(null);
											setResult(null);
										}}
										className="text-sm text-blue-600 hover:text-blue-800"
									>
										Test Image Baru
									</button>
								</div>
							</div>
						) : (
							<div className="text-center py-12">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-16 w-16 mx-auto text-gray-300 mb-4"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
									/>
								</svg>
								<p className="text-gray-500">
									Upload gambar dan klik "Detect HFMD" untuk melihat hasil
									deteksi
								</p>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
