const BASE_PATH = "./public";

Bun.serve({
	port: 8080,
	development: process.env.NODE_ENV === "dev",
	fetch(req) {
		const url = new URL(req.url);
		if (url.pathname.startsWith("/api")) {
			// Handle API requests
			if (url.pathname === "/api/data") {
				return new Response(
					JSON.stringify({ message: "Hello from the API!" }),
					{
						headers: { "Content-Type": "application/json" },
					},
				);
			}
		} else {
			// Serve static files
			const filePath = BASE_PATH + url.pathname;
			const file = Bun.file(filePath);
			return new Response(file);
		}
		return new Response("404!");
	},
  error() {
    return new Response("An error occurred", { status: 500 });
  }
});
