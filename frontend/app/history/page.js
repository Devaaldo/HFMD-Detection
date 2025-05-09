"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { HiInformationCircle, HiRefresh } from "react-icons/hi";

export default function HistoryPage() {
	const [historyData, setHistoryData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	const fetchHistory = async () => {
		setIsLoading(true);
		setError(null);

		try {
			// Panggil API langsung untuk history
			const response = await axios.get("http://localhost:5000/history", {
				headers: {
					Accept: "application/json",
				},
			});

			console.log("History response:", response.data);

			// Pastikan data adalah array sebelum memanggil reverse()
			const data = Array.isArray(response.data) ? response.data : [];

			// Tampilkan data terbaru di awal (jika ada data)
			setHistoryData(data.length > 0 ? [...data].reverse() : []);
		} catch (err) {
			console.error("History fetch error:", err);
			setError("Terjadi kesalahan saat mengambil data riwayat.");
		} finally {
			setIsLoading(false);
		}
	};

	// Panggil fetchHistory saat komponen di-mount
	useEffect(() => {
		fetchHistory();
	}, []);

	// Fungsi untuk memformat tanggal dari ID
	const formatDate = (id) => {
		// Extract date from ID like DETECT_20231015123456
		if (!id || !id.startsWith("DETECT_")) return "Unknown";

		const dateStr = id.replace("DETECT_", "");
		if (dateStr.length < 14) return dateStr;

		const year = dateStr.substring(0, 4);
		const month = dateStr.substring(4, 6);
		const day = dateStr.substring(6, 8);
		const hour = dateStr.substring(8, 10);
		const minute = dateStr.substring(10, 12);
		const second = dateStr.substring(12, 14);

		return `${day}/${month}/${year} ${hour}:${minute}:${second}`;
	};

	return (
		<div className="max-w-6xl mx-auto">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold text-gray-900">Riwayat Deteksi</h1>

				<button
					onClick={fetchHistory}
					className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
					disabled={isLoading}
				>
					<HiRefresh
						className={`h-5 w-5 mr-2 ${isLoading ? "animate-spin" : ""}`}
					/>
					Refresh
				</button>
			</div>

			{error && (
				<div className="mb-6 bg-red-50 border-l-4 border-red-400 p-4 rounded-md">
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

			{isLoading ? (
				<div className="bg-white shadow-md rounded-lg p-10 text-center">
					<div className="flex justify-center items-center">
						<div className="h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
					</div>
					<p className="mt-4 text-gray-600">Mengambil data riwayat...</p>
				</div>
			) : (
				<>
					{historyData.length === 0 ? (
						<div className="bg-white shadow-md rounded-lg p-8 text-center">
							<p className="text-gray-500">Tidak ada data riwayat deteksi.</p>
							<p className="text-sm text-gray-400 mt-2">
								Upload gambar di halaman utama untuk membuat data deteksi.
							</p>
						</div>
					) : (
						<div className="bg-white shadow-md rounded-lg overflow-hidden">
							<div className="px-4 py-5 sm:px-6 border-b">
								<h3 className="text-lg font-medium leading-6 text-gray-900">
									Data Riwayat Deteksi
								</h3>
								<p className="mt-1 max-w-2xl text-sm text-gray-500">
									Riwayat semua scan deteksi HFMD
								</p>
							</div>

							<div className="overflow-x-auto">
								<table className="min-w-full divide-y divide-gray-200">
									<thead className="bg-gray-50">
										<tr>
											<th
												scope="col"
												className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
											>
												Tanggal
											</th>
											<th
												scope="col"
												className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
											>
												Hasil
											</th>
											<th
												scope="col"
												className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
											>
												Confidence
											</th>
											<th
												scope="col"
												className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
											>
												Severity
											</th>
											<th
												scope="col"
												className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
											>
												Actions
											</th>
										</tr>
									</thead>
									<tbody className="bg-white divide-y divide-gray-200">
										{historyData.map((item) => (
											<tr key={item.id} className="hover:bg-gray-50">
												<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
													{formatDate(item.id)}
												</td>
												<td className="px-6 py-4 whitespace-nowrap">
													<span
														className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
															item.result_type === "HFMD"
																? "bg-red-100 text-red-800"
																: "bg-green-100 text-green-800"
														}`}
													>
														{item.result_type}
													</span>
												</td>
												<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
													{item.confidence}
												</td>
												<td className="px-6 py-4 whitespace-nowrap">
													<span
														className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
															item.severity === "tinggi"
																? "bg-red-100 text-red-800"
																: item.severity === "sedang"
																? "bg-yellow-100 text-yellow-800"
																: item.severity === "ringan"
																? "bg-orange-100 text-orange-800"
																: "bg-green-100 text-green-800"
														}`}
													>
														{item.severity}
													</span>
												</td>
												<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
													<div className="flex justify-end space-x-2">
														<button
															className="text-blue-600 hover:text-blue-900"
															onClick={() =>
																window.open(
																	`http://localhost:5000/static/uploads/${item.filename}`,
																	"_blank"
																)
															}
															title="View Image"
														>
															<svg
																xmlns="http://www.w3.org/2000/svg"
																className="h-5 w-5"
																fill="none"
																viewBox="0 0 24 24"
																stroke="currentColor"
															>
																<path
																	strokeLinecap="round"
																	strokeLinejoin="round"
																	strokeWidth={2}
																	d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
																/>
																<path
																	strokeLinecap="round"
																	strokeLinejoin="round"
																	strokeWidth={2}
																	d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
																/>
															</svg>
														</button>
													</div>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
					)}

					{historyData.length > 0 && (
						<div className="mt-6 bg-blue-50 border-l-4 border-blue-400 p-4 rounded-md">
							<div className="flex">
								<div className="flex-shrink-0">
									<HiInformationCircle className="h-5 w-5 text-blue-400" />
								</div>
								<div className="ml-3">
									<p className="text-sm text-blue-700">
										Total {historyData.length} hasil deteksi ditemukan.
										{historyData.filter((item) => item.result_type === "HFMD")
											.length > 0 && (
											<span className="ml-1">
												{
													historyData.filter(
														(item) => item.result_type === "HFMD"
													).length
												}{" "}
												di antaranya terdeteksi sebagai HFMD.
											</span>
										)}
									</p>
								</div>
							</div>
						</div>
					)}
				</>
			)}
		</div>
	);
}
