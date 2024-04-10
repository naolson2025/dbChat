import { useState } from "react";
import { ChatFeed } from "./components/chat-feed";
import { UserInput } from "./components/user-input";

export interface Message {
	role: "user" | "model";
	text: string;
}

function App() {
	const [messages, setMessages] = useState<Message[]>([
		{
			role: "model",
			text: "How can I assist you?",
		}
	]);

	const handleSendMessage = (message: string) => {
		setMessages((prevMessages) => [
			...prevMessages,
			{ role: "user", text: message },
		]);
		// POST request to /api/chat
		fetch("/api/chat", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ message }),
		})
			.then((res) => res.json())
			.then((data) => {
				setMessages((prevMessages) => [
					...prevMessages,
					{ role: "model", text: data.resp },
				]);
			})
			.catch((err) => console.error(err));
	};

	return (
		<div className="flex justify-center">
			<ChatFeed messages={messages} />
			<UserInput onSendMessage={handleSendMessage} />
		</div>
	);
}

export default App;
