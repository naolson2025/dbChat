import { expect, test } from "bun:test";
import { processUserInput } from "./model-utils";

test("processUserInput", async () => {
  const response = await processUserInput("What is the most expensive product?");
  console.log(response);
  expect(response).toContain("Refined Metal Towels")
  expect(response).toContain("1000")
});