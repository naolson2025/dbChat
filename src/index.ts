import { GoogleGenerativeAI } from "@google/generative-ai";
import { Database } from "bun:sqlite";
import { tools } from "./tools";

const db = new Database("store.sqlite");
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_KEY || "");

const model = genAI.getGenerativeModel({ model: "gemini-pro", tools: tools });

/*
  You have a database named store.sqlite.
  The database has a table named users with columns id, name, and email.
  Respond to all questions with the SQL query that would answer the question.
  The response should be in json format with a key-value pair of 'query' and the SQL query.
*/

const run = async () => {
	const prompt = `
    You are a sqlite database administrator.

    How many users do I have?
  `;

	const result = await model.generateContent(prompt);
	console.log(result.response.functionCall);
	const response = result.response;
	const text = response.text();
	console.log(text);
	// const res = db.query(text);
	// console.log(res);
};

run();
