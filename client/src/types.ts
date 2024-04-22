export interface Message {
	role: "user" | "model";
	parts: {
    text?: string;
    functionCall?: {
      name: string;
      args: {
        sqlQuery?: string;
        table?: string;
      };
    };
  }[];
}