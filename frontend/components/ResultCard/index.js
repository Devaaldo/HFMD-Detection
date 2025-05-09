"use client";

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
									isHFMD ? "bg-red-500" : "bg-green-500"
								}`}
								style={{
									width: isHFMD
										? result.confidence
										: `${100 - parseInt(result.confidence)}%`,
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
