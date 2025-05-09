import Layout from "../components/Layout";
import ChatbotInterface from "../components/ChatbotInterface";
import { HiLightBulb } from "react-icons/hi";

export default function Chatbot() {
	const tipsList = [
		{
			title: "Tanyakan tentang gejala",
			text: 'Misalnya: "Apa saja gejala HFMD?"',
		},
		{
			title: "Tanyakan cara pencegahan",
			text: 'Misalnya: "Bagaimana cara mencegah HFMD?"',
		},
		{
			title: "Informasi pengobatan",
			text: 'Misalnya: "Apa pengobatan untuk HFMD?"',
		},
		{
			title: "Informasi umum",
			text: 'Misalnya: "Berapa lama HFMD sembuh?"',
		},
	];

	return (
		<Layout title="HFMD Detection System - Chatbot">
			<div className="max-w-6xl mx-auto">
				<div className="text-center mb-8">
					<h1 className="text-2xl font-bold text-gray-900">HFMD Assistant</h1>
					<p className="text-gray-600">
						Tanyakan informasi seputar Hand, Foot, and Mouth Disease
					</p>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					<div className="lg:col-span-2">
						<ChatbotInterface />
					</div>

					<div>
						<div className="bg-white shadow-md rounded-lg p-6">
							<h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
								<HiLightBulb className="h-5 w-5 text-yellow-500 mr-2" />
								Tips Bertanya
							</h2>

							<div className="space-y-4">
								{tipsList.map((tip, index) => (
									<div
										key={index}
										className="border-b border-gray-100 pb-3 last:border-b-0 last:pb-0"
									>
										<h3 className="font-medium text-gray-800">{tip.title}</h3>
										<p className="text-sm text-gray-600 mt-1">{tip.text}</p>
									</div>
								))}
							</div>
						</div>

						<div className="mt-6 bg-white shadow-md rounded-lg p-6">
							<h2 className="text-xl font-semibold text-gray-800 mb-4">
								Keterbatasan
							</h2>
							<p className="text-gray-600 text-sm">
								Chatbot ini hanya memberikan informasi umum tentang HFMD dan
								tidak dimaksudkan untuk menggantikan konsultasi medis
								profesional. Jika Anda mencurigai adanya infeksi HFMD, mohon
								konsultasi dengan dokter.
							</p>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
}
