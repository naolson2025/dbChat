import { expect, test } from "bun:test";
import { queryDB } from "./query-db";

test("query-db", async () => {
	const query = "SELECT COUNT(*) as count FROM users";

	const result = await queryDB(query);
	expect(result).toEqual([{ count: 500 }]);
});
