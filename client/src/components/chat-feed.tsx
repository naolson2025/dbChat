import { LeftBubble } from "./left-bubble";
import { RightBubble } from "./right-bubble";

export const ChatFeed = () => {
  return (
    <>
      <div className="h-screen overflow-auto py-4 px-20">
        <ul className="space-y-5">
          <LeftBubble text="hello world" />
          <LeftBubble text="hello world here is a bunch more text giv eme more text to test with what will this look like ok more no more" />
          <LeftBubble text="hello world" />
          <RightBubble text="Goodbye world!" />
          <LeftBubble text="hello world" />
          <RightBubble text="Goodbye world!" />
          <RightBubble text="Goodbye world!" />
          <RightBubble text="Goodbye world!" />
          <LeftBubble text="hello world" />
          <LeftBubble text="hello world" />
          <LeftBubble text="hello world" />
          <RightBubble text="Goodbye world!" />
          <LeftBubble text="hello world" />
          <LeftBubble text="hello world" />
        </ul>
      </div>
    </>
  );
};