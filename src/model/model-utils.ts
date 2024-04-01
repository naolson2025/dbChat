import type { GenerateContentResult } from "@google/generative-ai";
import { getColumns, runQuery } from "../db/query-db";
import { chat } from "./model";
import { SQLiteError } from "bun:sqlite";

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
        result = await chat.sendMessage(error.message);
      } else {
        // throw this so it can be caught in run() index.ts
        throw error;
      }
    }
  }

	return resp;
};
