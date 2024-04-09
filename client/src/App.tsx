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
    },
  ]);

  const handleSendMessage = (message: string) => {
    setMessages([...messages, { role: 'user', text: message }]);
  };
  
	return (
		<div className="flex justify-center">
      <ChatFeed messages={messages} />
			<UserInput onSendMessage={handleSendMessage} />
		</div>
	);
}

export default App;
