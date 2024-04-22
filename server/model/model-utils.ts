import type { GenerateContentResult } from "@google/generative-ai";
import { getColumns, runQuery } from "../db/query-db";
import { chat, getChatInstance } from "./model";
import { SQLiteError } from "bun:sqlite";
import type { ServerWebSocket } from "bun";
import type { WebSocketData } from "../server";

export const handleRequestedTool = async (
	modelResp: GenerateContentResult,
): Promise<unknown[] | undefined> => {
	const tool = modelResp?.response?.functionCall();
	if (!tool) {
		return;
	}

	if (tool.name === "runQuery") {
		const args = tool.args as {
			sqlQuery?: string;
		};
		const sqlQuery = args?.sqlQuery?.replace(/"/g, "");
		if (!sqlQuery) throw new Error("No Query Provided to runQuery");
    
    if (sqlQuery.match(/(drop|delete|update)/i)) {
      throw new Error("Invalid query provided");
    }
		return await runQuery(sqlQuery);
	}

	if (tool.name === "getColumns") {
		const args = tool.args as {
			table?: string;
		};
		const table = args?.table?.replace(/"/g, "");
		if (!table) throw new Error("No Table Provided to getColumns");
		return await getColumns(table);
	}

	throw new Error("Invalid tool requested");
};

export const processUserInput = async (msg: string) => {
	let resp = "LLM failed to return a response";
	let result = await chat.sendMessage(msg);
  console.log(JSON.stringify(chat.params?.history));

	for (let i = 0; i < 5; i++) {
		if (result?.response?.text()) {
			resp = result.response.text();
			break;
		}

		try {
			// if we have data, that means a tool was used
			const data = await handleRequestedTool(result);
			if (data) {
				result = await chat.sendMessage(JSON.stringify(data));
			}
		} catch (error) {
			if (error instanceof SQLiteError) {
				result = await chat.sendMessage(
					`The query did not work, provide a new query, here is the error: ${error.message}`,
				);
			} else {
				// throw this so it can be caught in run() index.ts
				throw error;
			}
		}
	}

	return resp;
};

export const wsProcessUserInput = async (ws: ServerWebSocket<WebSocketData>, msg: string) => {
  const chatInstance = getChatInstance(ws.data.sessionId);
  let result = await chatInstance.sendMessage(msg);
  ws.send(JSON.stringify(chatInstance.params?.history?.at(-1)));
  
	for (let i = 0; i < 5; i++) {
    if (result?.response?.text()) {
			break;
		}

		try {
			// if we have data, that means a tool was used
			const data = await handleRequestedTool(result);
			if (data) {
				result = await chatInstance.sendMessage(JSON.stringify(data));
        ws.send(JSON.stringify(chatInstance.params?.history?.at(-2)))
        ws.send(JSON.stringify(chatInstance.params?.history?.at(-1)))
			}
		} catch (error) {
			if (error instanceof SQLiteError) {
				result = await chatInstance.sendMessage(
					`The query did not work, provide a new query, here is the error: ${error.message}`,
				);
        ws.send(JSON.stringify(chatInstance.params?.history?.at(-2)))
        ws.send(JSON.stringify(chatInstance.params?.history?.at(-1)))
			} else {
        ws.send("An internal server error occured");
				throw error;
			}
		}
	}
}