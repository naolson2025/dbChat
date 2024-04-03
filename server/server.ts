import { chatHandler } from "./routes/chat.service";

const server = Bun.serve({
  port: 8080,
  async fetch (req) {
    const path = new URL(req.url).pathname;

    if (path === "/hello") return new Response("Welcome to Bun!");

    if (req.method === "POST" && path === "/api/chat") {
      return chatHandler(req);
    }

    return new Response("Page not found", { status: 404 });
  }
})

console.log(`Listening on ${server.url}`);