import { GoogleGenerativeAI } from "@google/generative-ai";
import { tools } from "./tools";
import { queryDB } from "./query-db";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_KEY || "");

const model = genAI.getGenerativeModel(
	{ model: "gemini-pro", tools: tools },
	{ apiVersion: "v1beta" },
);

const run = async () => {
	const chat = model.startChat({
		history: [
			{
				role: "user",
				parts: [
					{ text: "You are a sqlite database administrator." },
					{
						text: "There are 3 tables in the database: users, products, and orders.",
					},
				],
			},
      {
        role: "model",
        parts: [
          { text: "How can I assist you?" }
        ]
      }
		],
	});

  const msg = "How many users do I have?";
  const result = await chat.sendMessage(msg);
  const response = result.response;

  // check if the model is asking for a function call
  // @ts-ignore
  const funcCall = response.candidates[0].content.parts[0].functionCall?.args.sqlQuery;
  console.log(funcCall);
	const res = await queryDB(funcCall.replace(/"/g, ""));
	console.log(res);
};

run();
