import { useEffect, useState } from "react";
import { ChatFeed } from "./components/chat-feed";
import { UserInput } from "./components/user-input";
import type { Message } from "./types";

function App() {
	const [messages, setMessages] = useState<Message[]>([]);
	const [ws, setWs] = useState<WebSocket | null>(null);

	// on mount connect to websocket
	useEffect(() => {
		const ws = new WebSocket("ws://localhost:8080/api/chat");
		ws.onopen = () => {
			console.log("Connected to WebSocket");
		};
		ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      // if event.data is an array, set messages
      // this loads all messages from history
      if (Array.isArray(data)) {
        return setMessages(data);
      }

      // append new message to messages
      setMessages((prevMessages) => [
        ...prevMessages,
        data,
      ]);
		};
		ws.onerror = (error) => {
			console.error(error);
		};
		ws.onclose = () => {
			console.log("Disconnected from WebSocket");
		};
		setWs(ws);
		return () => {
			ws.close();
		};
	}, []);

	const handleSendMessage = (message: string) => {
		setMessages((prevMessages) => [
			...prevMessages,
			{ role: "user", parts: [{ text: message }] },
		]);

		if (ws) {
			ws.send(message);
		}
	};

	return (
		<div className="flex justify-center">
			<ChatFeed messages={messages} />
			<UserInput onSendMessage={handleSendMessage} />
		</div>
	);
}

export default App;
