"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

export default function ImageUploader({ onImageUpload, isLoading }) {
	const [preview, setPreview] = useState(null);
	const [error, setError] = useState(null);

	const onDrop = useCallback(
		(acceptedFiles) => {
			setError(null);

			// Check if any files were dropped
			if (acceptedFiles.length === 0) return;

			const file = acceptedFiles[0];

			// Validate file type
			const validTypes = ["image/jpeg", "image/jpg", "image/png"];
			if (!validTypes.includes(file.type)) {
				setError("Please select a valid image file (JPG, JPEG, or PNG)");
				return;
			}

			// Create preview
			const objectUrl = URL.createObjectURL(file);
			setPreview(objectUrl);

			// Pass file to parent component
			onImageUpload(file);

			// Clean up the preview URL when component unmounts
			return () => URL.revokeObjectURL(objectUrl);
		},
		[onImageUpload]
	);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: {
			"image/jpeg": [".jpg", ".jpeg"],
			"image/png": [".png"],
		},
		maxFiles: 1,
		disabled: isLoading,
	});

	const clearImage = (e) => {
		e.stopPropagation();
		setPreview(null);
		onImageUpload(null);
	};

	return (
		<div className="space-y-4">
			<div
				{...getRootProps()}
				className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition ${
					isDragActive
						? "border-primary-500 bg-primary-50"
						: "border-gray-300 hover:border-primary-400"
				} ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
			>
				<input {...getInputProps()} />

				<div className="flex flex-col items-center justify-center">
					{preview ? (
						<div className="relative w-full max-w-md mx-auto">
							<img
								src={preview}
								alt="Preview"
								className="max-w-full h-auto max-h-64 rounded-lg object-contain mx-auto"
							/>
							<button
								onClick={clearImage}
								className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
								disabled={isLoading}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-4 w-4"
									viewBox="0 0 20 20"
									fill="currentColor"
								>
									<path
										fillRule="evenodd"
										d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
										clipRule="evenodd"
									/>
								</svg>
							</button>
						</div>
					) : (
						<>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-12 w-12 text-gray-400"
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
								{isDragActive
									? "Drop the image here..."
									: "Drag & drop gambar di sini, atau klik untuk memilih file"}
							</p>
							<p className="mt-1 text-xs text-gray-500">
								Mendukung: PNG, JPG, JPEG
							</p>
						</>
					)}
				</div>
			</div>

			{error && (
				<div className="text-red-600 text-sm flex items-center">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-5 w-5 mr-1"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fillRule="evenodd"
							d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
							clipRule="evenodd"
						/>
					</svg>
					{error}
				</div>
			)}

			<button
				type="button"
				onClick={() => document.querySelector('input[type="file"]').click()}
				className={`w-full btn btn-primary flex items-center justify-center ${
					isLoading ? "opacity-50 cursor-not-allowed" : ""
				}`}
				disabled={isLoading}
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
					<>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5 mr-2"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
							/>
						</svg>
						Upload Gambar
					</>
				)}
			</button>
		</div>
	);
}
