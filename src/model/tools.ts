import {
	FunctionDeclarationSchemaType,
	type FunctionDeclarationsTool,
} from "@google/generative-ai";

export const tools: FunctionDeclarationsTool[] = [
  {
    functionDeclarations: [
      {
        name: "runQuery",
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
      {
        name: "getColumns",
        description: "Get the columns for a table in the store.sqlite database",
        parameters: {
          type: FunctionDeclarationSchemaType.STRING,
          properties: {
            table: {
              type: FunctionDeclarationSchemaType.STRING,
              description: "The name of the table",
            },
          },
          required: ["table"],
        },
      }
    ],
  },
];
