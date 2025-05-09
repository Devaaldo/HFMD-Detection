import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import HistoryTable from "../components/HistoryTable";
import { getHistory } from "../utils/api";
import { HiInformationCircle, HiRefresh } from "react-icons/hi";

export default function History() {
	const [historyData, setHistoryData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	const fetchHistory = async () => {
		setIsLoading(true);
		setError(null);

		try {
			const data = await getHistory();
			setHistoryData(data.reverse()); // Display newest first
		} catch (err) {
			setError("Terjadi kesalahan saat mengambil data riwayat.");
			console.error("History fetch error:", err);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchHistory();
	}, []);

	return (
		<Layout title="HFMD Detection System - History">
			<div className="max-w-6xl mx-auto">
				<div className="flex justify-between items-center mb-6">
					<h1 className="text-2xl font-bold text-gray-900">Riwayat Deteksi</h1>

					<button
						onClick={fetchHistory}
						className="flex items-center px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
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
							<div className="h-8 w-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
						</div>
						<p className="mt-4 text-gray-600">Mengambil data riwayat...</p>
					</div>
				) : (
					<>
						<HistoryTable data={historyData} />

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
		</Layout>
	);
}
