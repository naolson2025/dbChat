import { type SetStateAction, useState } from "react";

interface UserInputProps {
	onSendMessage: (message: string) => void;
}

export const UserInput = (props: UserInputProps) => {
	const [message, setMessage] = useState("");

	const handleInputChange = (e: {
		target: { value: SetStateAction<string> };
	}) => {
		setMessage(e.target.value);
	};

	const handleSendMessage = () => {
		if (message.trim() !== "") {
			props.onSendMessage(message.trim());
			setMessage("");
		}
	};

	return (
		<div className="max-w-2xl fixed bottom-0 text-white p-8">
			<input
				type="text"
				className="bg-gray-600 rounded-lg px-4 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-600"
				placeholder="Type your message..."
				onChange={handleInputChange}
				value={message}
			/>
			<button
				type="button"
				className="bg-blue-600 hover:bg-blue-700 rounded-lg px-4 py-2 ml-2"
				onClick={handleSendMessage}
			>
				Send
			</button>
		</div>
	);
};
