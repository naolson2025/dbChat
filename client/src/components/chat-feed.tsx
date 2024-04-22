import type { Message } from "../types";
import { LeftBubble } from "./left-bubble";
import { RightBubble } from "./right-bubble";

interface ChatFeedProps {
	messages: Message[];
}

// make key
const makeKey = () => Math.random().toString(36).substring(7);

export const ChatFeed = (props: ChatFeedProps) => {
  console.log(props.messages);
  if (!props.messages || props.messages.length === 0) {
    return null;
  }

	return (
		<div className="overflow-auto pt-4 px-20 max-w-2xl pb-32">
			<ul className="space-y-5">
				{props.messages?.map((message) => {
          // using a unique key for each message, bc index is not recommended
					if (message.role === "user") {
            return message?.parts?.map((part) => {
              if (part.text) {
                return <RightBubble key={makeKey()} text={part.text} />;
              }
              return <RightBubble key={makeKey()} text={JSON.stringify(part.functionCall?.args)} />;
            });
					}

          return message?.parts?.map((part) => {
            if (part.text) {
              return <LeftBubble key={makeKey()} text={part.text} />;
            }
            return <LeftBubble key={makeKey()} text={JSON.stringify(part.functionCall?.args)} />;
          });
				})}
			</ul>
		</div>
	);
};
