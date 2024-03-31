import { expect, test } from "bun:test";
import { queryDB } from "./query-db";

test("query-db", async () => {
	const query = "SELECT COUNT(*) as count FROM users";

	const result = await queryDB(query);
	expect(result).toEqual([{ count: 500 }]);
});

test("remove extra double quotes", async () => {
  const query = "\"SELECT COUNT(*) FROM USER\""
  const parse = query.replace(/"/g, "");
  expect(parse).toEqual("SELECT COUNT(*) FROM USER");
});