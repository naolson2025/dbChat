import { processUserInput } from "../server/model/model-utils";
const { prompt } = require('enquirer');

export const promptUser = async () => {
  const response = await prompt({
    type: "input",
    name: "message",
    message: ">>",
  });

  return response.message;
};

export const run = async () => {
	console.log("I'm your DB assistant how can I help? (type 'exit' to quit)");

	let exit = false;
	while (!exit) {
		try {
      const msg = await promptUser();

			if (msg === "exit" || !msg) {
				exit = true;
				break;
			}

      const resp = await processUserInput(msg);
      console.log(resp);
		} catch (error) {
			console.error(error);
			console.log("An error occurred. Please try again.");
		}
	}
};

run();