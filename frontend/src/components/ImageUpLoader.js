import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { HiUpload, HiPhotograph, HiExclamation } from "react-icons/hi";

export default function ImageUploader({ onImageUpload, isLoading }) {
	const [preview, setPreview] = useState(null);
	const [error, setError] = useState(null);

	const onDrop = useCallback(
		(acceptedFiles) => {
			setError(null);

			// Check file type
			const file = acceptedFiles[0];
			if (!file) return;

			const fileType = file.type;
			if (!["image/jpeg", "image/jpg", "image/png"].includes(fileType)) {
				setError("Please upload a PNG, JPG, or JPEG image.");
				return;
			}

			// Preview image
			const objectUrl = URL.createObjectURL(file);
			setPreview(objectUrl);

			// Pass file to parent component
			onImageUpload(file);

			// Free memory when component unmounts
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

	return (
		<div className="space-y-4">
			<div
				{...getRootProps()}
				className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition ${
					isDragActive
						? "border-primary-500 bg-primary-50"
						: "border-gray-300 hover:border-primary-400 hover:bg-gray-50"
				} ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
			>
				<input {...getInputProps()} />
				<div className="flex flex-col items-center justify-center">
					{preview ? (
						<div className="relative w-full max-w-md mx-auto">
							<img
								src={preview}
								alt="Preview"
								className="w-full h-auto max-h-64 rounded-lg object-contain"
							/>
							<button
								onClick={(e) => {
									e.stopPropagation();
									setPreview(null);
								}}
								className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
								disabled={isLoading}
							>
								<HiX className="h-4 w-4" />
							</button>
						</div>
					) : (
						<>
							<HiPhotograph className="h-12 w-12 text-gray-400" />
							<p className="mt-2 text-sm text-gray-600">
								{isDragActive
									? "Drop the image here..."
									: "Drag & drop an image here, or click to select one"}
							</p>
							<p className="mt-1 text-xs text-gray-500">
								Supports: PNG, JPG, JPEG
							</p>
						</>
					)}
				</div>
			</div>

			{error && (
				<div className="flex items-center text-red-600 text-sm">
					<HiExclamation className="h-5 w-5 mr-1" />
					{error}
				</div>
			)}

			<button
				type="button"
				onClick={() => document.querySelector('input[type="file"]').click()}
				className={`btn btn-primary w-full ${
					isLoading ? "opacity-50 cursor-not-allowed" : ""
				}`}
				disabled={isLoading}
			>
				<HiUpload className="h-5 w-5 mr-2" />
				{isLoading ? "Processing..." : "Upload Image"}
			</button>
		</div>
	);
}
