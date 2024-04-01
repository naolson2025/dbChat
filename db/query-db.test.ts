import { expect, test } from "bun:test";
import { runQuery, getColumns } from "./query-db";

test("query-db", async () => {
	const query = "SELECT COUNT(*) as count FROM users";

	const result = await runQuery(query);
	expect(result).toEqual([{ count: 500 }]);
});

test("remove extra double quotes", async () => {
	const query = '"SELECT COUNT(*) FROM USER"';
	const parse = query.replace(/"/g, "");
	expect(parse).toEqual("SELECT COUNT(*) FROM USER");
});

test("get columns", async () => {
	const columns = await getColumns("users");
	expect(columns).toEqual([
		{
			cid: 0,
			name: "id",
			type: "INTEGER",
			notnull: 0,
			dflt_value: null,
			pk: 1,
		},
		{ cid: 1, name: "name", type: "TEXT", notnull: 1, dflt_value: null, pk: 0 },
		{
			cid: 2,
			name: "email",
			type: "TEXT",
			notnull: 1,
			dflt_value: null,
			pk: 0,
		},
	]);
});
