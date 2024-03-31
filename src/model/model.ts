import {
	GoogleGenerativeAI,
	type GenerateContentResult,
} from "@google/generative-ai";
import { tools } from "./tools";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_KEY || "");

const model = genAI.getGenerativeModel(
	{ model: "gemini-pro", tools: tools },
	{ apiVersion: "v1beta" },
);

export const chat = model.startChat({
	history: [
		{
			role: "user",
			parts: [
				{ text: "You are a sqlite database administrator." },
				{
					text: "There are 3 tables in the database: users, products, and orders. Only run queries on these tables.",
				},
        {
          text: "Do not make assumptions about column names or types, use the tools you are given."
        },
        {
          text: "Do not run any queries that modify the database."
        },
			],
		},
		{
			role: "model",
			parts: [{ text: "How can I assist you?" }],
		},
	],
});

export const getQuery = (
	modelResp: GenerateContentResult,
): string | undefined => {
	const args = modelResp?.response?.functionCall()?.args as {
		sqlQuery?: string;
	};
	if (!args) {
		return;
	}

	return args?.sqlQuery?.replace(/"/g, "");
};
