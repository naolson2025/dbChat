export const UserInput = () => {
	return (
		<div className="w-full fixed bottom-0 text-white p-8 flex items-center justify-center">
			<input
				type="text"
				className="bg-gray-600 rounded-lg px-4 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-600"
				placeholder="Type your message..."
			/>
			<button
				type="button"
				className="bg-blue-600 hover:bg-blue-700 rounded-lg px-4 py-2 ml-2"
			>
				Send
			</button>
		</div>
	);
};
