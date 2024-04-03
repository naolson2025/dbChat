import { run } from "../model";

export const chatHandler = async (req: Request) => {
	let data: unknown;
	try {
		data = await req.json();
		// validate data has the key value pair of "message" and a string value
		if (
			typeof data !== "object" ||
			typeof (data as { message: string })?.message !== "string"
		) {
			return new Response("Invalid JSON", { status: 400 });
		}
    // drop any properties that are not "message"
    data = { message: (data as { message: string }).message };
		console.log("Received JSON:", data);
    // this went into an infinite loop, need to fix
    // await run(data.message);
	} catch (error) {
		return new Response("Invalid JSON", { status: 400 });
	}
	return Response.json({ success: true, data });
};
