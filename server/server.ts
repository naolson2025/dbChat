import { chatHandler } from "./handlers/chat.handler";
import { destroyChatInstance, getChatInstance } from "./model/model";
import { wsProcessUserInput } from "./model/model-utils";

export type WebSocketData = {
  sessionId: string;
};

const server = Bun.serve<WebSocketData>({
  port: 8080,
  async fetch (req, server) {
    const path = new URL(req.url).pathname;

    if (path === "/hello") return new Response("Welcome to Bun!");

    if (req.method === "POST" && path === "/api/chat") {
      return chatHandler(req);
    }

    if (req.method === "GET" && path === "/api/chat") {
      console.log("Upgrade to websocket...")
      const sessionId = Math.random().toString(36).substring(7)
      console.log(`SessionId: ${sessionId}`)
      const success = server.upgrade(req, {
        headers: {
          "Set-Cookie": `SessionId=${sessionId}`
        },
        data: {
          sessionId
        }
      });
      return success
        ? undefined
        : new Response("WebSocket upgrade error", { status: 400 });
    }

    return new Response("Page not found", { status: 404 });
  },
  websocket: {
    open (ws) {
      // get new chat instance
      const chatInstance = getChatInstance(ws.data.sessionId);
      console.log(chatInstance.params?.history)
      ws.send(JSON.stringify(chatInstance.params?.history) || "No history found");
    },
    // run every time a message is received
    async message (ws, message) {
      try {
        await wsProcessUserInput(ws, String(message));
      } catch (error) {
        ws.send("An internal server error occured");
      }
    },
    close (ws) {
      // destroy chat instance
      console.log("Destroying chat instance...")
      destroyChatInstance(ws.data.sessionId);
      console.log("WebSocket closed")
    }
  },
  error (err) {
    console.error(err);
    return new Response("An internal server error occured", { status: 500 });
  }
})

console.log(`Listening on ${server.url}`);