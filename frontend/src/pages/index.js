import { useState } from "react";
import Layout from "../components/Layout";
import ImageUploader from "../components/ImageUploader";
import ResultCard from "../components/ResultCard";
import { uploadImage } from "../utils/api";
import { HiInformationCircle, HiCheckCircle } from "react-icons/hi";

export default function Home() {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [result, setResult] = useState(null);

	const handleImageUpload = async (file) => {
		setIsLoading(true);
		setError(null);
		setResult(null);

		try {
			const response = await uploadImage(file);
			setResult(response);
		} catch (err) {
			setError("Terjadi kesalahan saat mengunggah gambar. Silakan coba lagi.");
			console.error("Upload error:", err);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Layout title="HFMD Detection System - Upload Image">
			<div className="max-w-4xl mx-auto">
				<div className="text-center mb-8">
					<h1 className="text-3xl font-bold text-gray-900 mb-2">
						HFMD Detection System
					</h1>
					<p className="text-gray-600 text-lg">
						Upload gambar untuk mendeteksi Hand, Foot, and Mouth Disease
					</p>
				</div>

				<div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6 rounded-md">
					<div className="flex">
						<div className="flex-shrink-0">
							<HiInformationCircle className="h-5 w-5 text-blue-400" />
						</div>
						<div className="ml-3">
							<p className="text-sm text-blue-700">
								Sistem ini menggunakan machine learning untuk membantu
								mendeteksi kemungkinan HFMD dari gambar. Harap diingat bahwa
								hasil deteksi tidak menggantikan diagnosis profesional medis.
							</p>
						</div>
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					<div>
						<div className="bg-white shadow-md rounded-lg p-6">
							<h2 className="text-xl font-semibold text-gray-800 mb-4">
								Upload Gambar
							</h2>
							<ImageUploader
								onImageUpload={handleImageUpload}
								isLoading={isLoading}
							/>
						</div>

						{error && (
							<div className="mt-4 bg-red-50 border-l-4 border-red-400 p-4 rounded-md">
								<div className="flex">
									<div className="flex-shrink-0">
										<HiInformationCircle className="h-5 w-5 text-red-400" />
									</div>
									<div className="ml-3">
										<p className="text-sm text-red-700">{error}</p>
									</div>
								</div>
							</div>
						)}

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
						{result ? (
							<>
								<div className="bg-white shadow-md rounded-lg p-6 mb-6">
									<h2 className="text-xl font-semibold text-gray-800 mb-4">
										Hasil Deteksi
									</h2>
									<ResultCard result={result} />
								</div>

								<div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-md">
									<div className="flex">
										<div className="flex-shrink-0">
											<HiCheckCircle className="h-5 w-5 text-green-400" />
										</div>
										<div className="ml-3">
											<p className="text-sm text-green-700">
												Hasil deteksi telah disimpan dan dapat dilihat di
												halaman History.
											</p>
										</div>
									</div>
								</div>
							</>
						) : (
							<div className="bg-white shadow-md rounded-lg p-6">
								<h2 className="text-xl font-semibold text-gray-800 mb-4">
									Hasil Deteksi
								</h2>
								<div className="text-center py-12">
									<p className="text-gray-500">
										Upload gambar untuk melihat hasil deteksi
									</p>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</Layout>
	);
}
