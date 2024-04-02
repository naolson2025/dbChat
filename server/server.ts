import { Elysia } from "elysia";
import { hello } from "./routes/chat.service";

export const app = new Elysia()
	.get("/", () => Bun.file("./client/hello.html"))
	.get("/hello", () => hello())
  .post("/api/chat", (req) => "Chat time!")
	.listen(3000);
