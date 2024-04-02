import { app } from "./server";
import { expect, test } from "bun:test";

test("GET /", async () => {
	const resp = await app
		.handle(new Request("http://localhost:3000/hello"))
		.then((res) => res.text());
    
	expect(resp).toContain("Hello, World!");
});
