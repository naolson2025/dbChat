import { GoogleGenerativeAI } from "@google/generative-ai";
import { tools } from "./tools";
import { queryDB } from "./query-db";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_KEY || "");

const model = genAI.getGenerativeModel(
	{ model: "gemini-pro", tools: tools },
	{ apiVersion: "v1beta" },
);

const run = async () => {
	const prompt = `
    You are a sqlite database administrator.

    How many users do I have?
  `;

	const result = await model.generateContent(prompt);
	const response = result.response;
	const text = response.text();

  // @ts-ignore
  const funcCall = response.candidates[0].content.parts[0].functionCall?.args.sqlQuery;
  console.log(funcCall);
	const res = await queryDB(funcCall.replace(/"/g, ""));
	console.log(res);
};

run();
