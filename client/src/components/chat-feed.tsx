import type { Message } from "../App";
import { LeftBubble } from "./left-bubble";
import { RightBubble } from "./right-bubble";

interface ChatFeedProps {
	messages: Message[];
}

export const ChatFeed = (props: ChatFeedProps) => {
	return (
		<div className="overflow-auto pt-4 px-20 max-w-2xl pb-32">
			<ul className="space-y-5">
				{props.messages.map((message) => {
          // using a unique key for each message, bc index is not recommended
          const key = Math.random().toString(36).substring(7);
					if (message.role === "user") {
						return <RightBubble key={key} text={message.text} />;
					}
					return <LeftBubble key={key} text={message.text} />;
				})}
			</ul>
		</div>
	);
};
