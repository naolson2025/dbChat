const { prompt } = require('enquirer');

export const promptUser = async () => {
  const response = await prompt({
    type: "input",
    name: "message",
    message: ">>",
  });

  return response.message;
};
