import { queryDB, getColumns } from "./db/query-db";
import { chat, getQuery } from "./model/model";
import { promptUser } from "./utils/user-prompts";

const run = async () => {
	console.log("I'm your DB assistant how can I help? (type 'exit' to quit)");

	let exit = false;
	while (!exit) {
    try {
      const msg = await promptUser();

      if (msg === "exit" || !msg) {
        exit = true;
        break;
      }

      const result = await chat.sendMessage(msg);
      const query = getQuery(result);
      let text = result?.response?.text();

      // The model is requesting column names from a table
      // TODO: Implement the getColumns function in src/db/query-db.ts

      // The model is requesting a query to be executed
      if (query) {
        console.log(query);
        const res = await queryDB(query);
        console.log(res);
        const result2 = await chat.sendMessage(JSON.stringify(res));
        text = result2?.response?.text();
      }

      // The model has a response to display
      if (text) {
        console.log(text);
      }
    } catch (error) {
      console.error(error);
      console.log("An error occurred. Please try again.");
    }
	}
};

run();
