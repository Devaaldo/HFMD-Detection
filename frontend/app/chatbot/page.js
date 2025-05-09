"use client";

import { useState } from "react";
import axios from "axios";
import { HiLightBulb, HiPaperAirplane } from "react-icons/hi";

export default function ChatbotPage() {
	const [messages, setMessages] = useState([
		{
			id: 1,
			text: "Halo! Saya adalah HFMD Assistant. Saya dapat membantu Anda dengan informasi tentang Hand, Foot, and Mouth Disease (HFMD). Apa yang ingin Anda ketahui?",
			sender: "bot",
			timestamp: new Date(),
		},
	]);
	const [inputValue, setInputValue] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handleSendMessage = async (e) => {
		e.preventDefault();

		if (!inputValue.trim()) return;

		const userMessage = {
			id: messages.length + 1,
			text: inputValue,
			sender: "user",
			timestamp: new Date(),
		};

		setMessages((prev) => [...prev, userMessage]);
		setInputValue("");
		setIsLoading(true);

		// Respons cepat dari chatbot lokal
		const botResponses = {
			"apa itu hfmd":
				"HFMD (Hand, Foot, and Mouth Disease) adalah penyakit virus yang umum terjadi pada bayi dan anak-anak. Penyakit ini disebabkan oleh virus dalam kelompok enterovirus, terutama virus Coxsackie A16. Gejalanya termasuk demam, ruam merah (tidak gatal) di tangan dan kaki, serta luka pada mulut.",
			gejala:
				"Gejala HFMD biasanya dimulai dengan:\n1. Demam\n2. Sakit tenggorokan\n3. Kehilangan nafsu makan\nSetelah 1-2 hari, akan muncul:\n- Luka di mulut (sakit dan mengganggu makan)\n- Ruam tidak gatal di tangan, kaki, dan terkadang bokong\n- Lepuhan kecil yang berisi cairan",
			pencegahan:
				"Cara terbaik mencegah HFMD adalah: \n1. Cuci tangan secara teratur dengan sabun\n2. Hindari kontak dekat dengan orang yang terinfeksi\n3. Bersihkan dan disinfeksi permukaan yang sering disentuh\n4. Hindari berbagi peralatan makan, handuk, dan barang pribadi lainnya",
			bahaya:
				"HFMD umumnya bukan penyakit serius. Kebanyakan anak sembuh dalam 7-10 hari. Namun dalam kasus yang jarang terjadi, bisa muncul komplikasi seperti meningitis, ensefalitis, atau mialgia. Jika gejala memburuk, segera konsultasi dengan dokter.",
			pengobatan:
				"Tidak ada pengobatan spesifik untuk HFMD. Perawatan berfokus pada meringankan gejala:\n- Obat pereda nyeri dan penurun demam seperti paracetamol\n- Obat kumur atau semprotan antiseptik untuk meredakan nyeri mulut\n- Banyak minum cairan dingin (hindari minuman asam)\n- Istirahat yang cukup",
			sembuh:
				"HFMD biasanya sembuh sendiri dalam waktu 7-10 hari tanpa pengobatan khusus. Selama masa pemulihan, penting untuk menjaga cairan tubuh dan memastikan kenyamanan anak.",
		};

		// Periksa apakah inputValue mengandung kata kunci
		let botReply =
			"Maaf, saya tidak mengerti pertanyaan Anda. Bisakah Anda mencoba bertanya tentang gejala HFMD, cara pencegahan, atau pengobatannya?";

		const lowerInput = inputValue.toLowerCase();
		Object.keys(botResponses).forEach((key) => {
			if (lowerInput.includes(key)) {
				botReply = botResponses[key];
			}
		});

		// Simulasi delay jaringan
		setTimeout(() => {
			const botMessage = {
				id: messages.length + 2,
				text: botReply,
				sender: "bot",
				timestamp: new Date(),
			};

			setMessages((prev) => [...prev, botMessage]);
			setIsLoading(false);
		}, 1000);
	};

	const formatTime = (date) => {
		return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
	};

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
		<div className="max-w-6xl mx-auto">
			<div className="text-center mb-8">
				<h1 className="text-2xl font-bold text-gray-900">HFMD Assistant</h1>
				<p className="text-gray-600">
					Tanyakan informasi seputar Hand, Foot, and Mouth Disease
				</p>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				<div className="lg:col-span-2">
					<div className="flex flex-col h-[600px] bg-white rounded-lg shadow overflow-hidden">
						<div className="bg-blue-600 text-white p-4">
							<h3 className="text-lg font-semibold">HFMD Assistant</h3>
							<p className="text-sm opacity-80">
								Tanyakan informasi seputar HFMD
							</p>
						</div>

						<div className="flex-grow overflow-y-auto p-4 bg-gray-50">
							<div className="space-y-4">
								{messages.map((message) => (
									<div
										key={message.id}
										className={`flex ${
											message.sender === "user"
												? "justify-end"
												: "justify-start"
										}`}
									>
										<div
											className={`max-w-xs md:max-w-md rounded-lg p-3 ${
												message.sender === "user"
													? "bg-blue-500 text-white rounded-br-none"
													: "bg-white shadow rounded-bl-none"
											}`}
										>
											<p className="whitespace-pre-line">{message.text}</p>
											<p
												className={`text-xs mt-1 text-right ${
													message.sender === "user"
														? "text-blue-100"
														: "text-gray-400"
												}`}
											>
												{formatTime(message.timestamp)}
											</p>
										</div>
									</div>
								))}
								{isLoading && (
									<div className="flex justify-start">
										<div className="bg-white shadow rounded-lg rounded-bl-none p-3">
											<div className="flex space-x-2">
												<div className="h-2 w-2 bg-gray-300 rounded-full animate-bounce"></div>
												<div className="h-2 w-2 bg-gray-300 rounded-full animate-bounce delay-100"></div>
												<div className="h-2 w-2 bg-gray-300 rounded-full animate-bounce delay-200"></div>
											</div>
										</div>
									</div>
								)}
							</div>
						</div>

						<form
							onSubmit={handleSendMessage}
							className="border-t p-3 bg-white"
						>
							<div className="flex items-center space-x-2">
								<div className="flex-grow">
									<input
										type="text"
										value={inputValue}
										onChange={(e) => setInputValue(e.target.value)}
										placeholder="Ketik pesan..."
										className="w-full border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
										disabled={isLoading}
									/>
								</div>
								<button
									type="submit"
									className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
									disabled={isLoading || !inputValue.trim()}
								>
									<HiPaperAirplane className="h-5 w-5 transform rotate-90" />
								</button>
							</div>
						</form>
					</div>
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
							Chatbot ini hanya memberikan informasi umum tentang HFMD dan tidak
							dimaksudkan untuk menggantikan konsultasi medis profesional. Jika
							Anda mencurigai adanya infeksi HFMD, mohon konsultasi dengan
							dokter.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
