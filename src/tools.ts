import {
	FunctionDeclarationSchemaType,
	type FunctionDeclarationsTool,
} from "@google/generative-ai";

export const tools: FunctionDeclarationsTool[] = [
  {
    functionDeclarations: [
      {
        name: "queryDB",
        description: "Query the store.sqlite database",
        parameters: {
          type: FunctionDeclarationSchemaType.STRING,
          properties: {
            sqlQuery: {
              type: FunctionDeclarationSchemaType.STRING,
              description: "The SQL query to run",
            },
          },
          required: ["sqlQuery"],
        },
      },
    ],
  },
];
