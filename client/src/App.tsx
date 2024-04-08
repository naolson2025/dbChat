import { LeftBubble } from "./components/left-bubble";
import { RightBubble } from "./components/right-bubble";
import { UserInput } from "./components/user-input";

function App() {
	return (
		<>
			<div className="flex flex-col items-center justify-center h-screen my-12">
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
			<UserInput />
			</div>
		</>
	);
}

export default App;
