"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function DynamicImage({
	src,
	alt,
	className = "",
	width = 400,
	height = 300,
}) {
	const [imageSrc, setImageSrc] = useState("");
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const loadImage = async () => {
			try {
				// Untuk gambar base64
				if (src && src.startsWith("data:image")) {
					setImageSrc(src);
					setLoading(false);
					return;
				}

				// Untuk gambar dari backend Flask
				if (src && src.includes("uploads/")) {
					// Gunakan URL langsung melalui rewrites
					setImageSrc(`/static/${src.split("static/")[1]}`);
					setLoading(false);
					return;
				}

				// Default untuk gambar lainnya
				setImageSrc(src);
				setLoading(false);
			} catch (err) {
				console.error("Error loading image:", err);
				setError("Failed to load image");
				setLoading(false);
			}
		};

		if (src) {
			loadImage();
		}
	}, [src]);

	if (loading) {
		return (
			<div
				className={`bg-gray-200 animate-pulse ${className}`}
				style={{ width, height }}
			>
				<div className="flex items-center justify-center h-full">
					<span className="text-gray-400">Loading...</span>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className={`bg-gray-100 ${className}`} style={{ width, height }}>
				<div className="flex items-center justify-center h-full">
					<span className="text-red-500">{error}</span>
				</div>
			</div>
		);
	}

	// For base64 or direct URLs
	if (imageSrc.startsWith("data:image") || imageSrc.startsWith("/static/")) {
		return (
			// Use img tag for base64 images
			<img
				src={imageSrc}
				alt={alt || "Image"}
				className={`${className}`}
				style={{
					maxWidth: "100%",
					height: "auto",
					objectFit: "contain",
				}}
			/>
		);
	}

	return (
		<Image
			src={imageSrc}
			alt={alt || "Image"}
			width={width}
			height={height}
			className={className}
		/>
	);
}
