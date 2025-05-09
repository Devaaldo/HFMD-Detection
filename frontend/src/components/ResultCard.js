import { HiCheck, HiExclamation } from "react-icons/hi";

export default function ResultCard({ result }) {
	if (!result) return null;

	const isHFMD = result.result === "HFMD";

	return (
		<div
			className={`card border-l-4 ${
				isHFMD ? "border-l-red-500" : "border-l-green-500"
			}`}
		>
			<div className="p-5">
				<div className="flex items-center">
					<div
						className={`flex-shrink-0 rounded-full p-1 ${
							isHFMD ? "bg-red-100 text-red-500" : "bg-green-100 text-green-500"
						}`}
					>
						{isHFMD ? (
							<HiExclamation className="h-6 w-6" />
						) : (
							<HiCheck className="h-6 w-6" />
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
									isHFMD ? "bg-red-500" : "bg-green-500"
								}`}
								style={{
									width: isHFMD
										? result.confidence
										: `${parseFloat(result.confidence) - 100}%`,
								}}
							></div>
						</div>
						<span className="ml-3 text-sm font-medium">
							{result.confidence} {isHFMD ? "HFMD" : "Non-HFMD"}
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

					<div className="text-sm text-gray-600 whitespace-pre-line">
						{result.detailed_result.description}
					</div>
				</div>
			</div>
		</div>
	);
}
