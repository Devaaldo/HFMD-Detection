"use client";

import { useState } from "react";
import { HiDotsVertical, HiEye } from "react-icons/hi";

export default function HistoryTable({ data }) {
	const [detailId, setDetailId] = useState(null);

	if (!data || data.length === 0) {
		return (
			<div className="bg-white shadow rounded-lg p-6 text-center">
				<p className="text-gray-600">No detection history found.</p>
			</div>
		);
	}

	// Function to format date from the ID format
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
		<div className="bg-white shadow-md rounded-lg overflow-hidden">
			<div className="px-4 py-5 sm:px-6 border-b">
				<h3 className="text-lg font-medium leading-6 text-gray-900">
					Detection History
				</h3>
				<p className="mt-1 max-w-2xl text-sm text-gray-500">
					Record of all HFMD detection scans
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
								Date
							</th>
							<th
								scope="col"
								className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
							>
								Result
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
						{data.map((item) => (
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
											className="text-primary-600 hover:text-primary-900"
											onClick={() =>
												window.open(`/api/image/${item.filename}`, "_blank")
											}
											title="View Image"
										>
											<HiEye className="h-5 w-5" />
										</button>
										<button
											className="text-primary-600 hover:text-primary-900"
											onClick={() =>
												setDetailId(detailId === item.id ? null : item.id)
											}
											title="Toggle Details"
										>
											<HiDotsVertical className="h-5 w-5" />
										</button>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
