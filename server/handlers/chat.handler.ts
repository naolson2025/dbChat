import { processUserInput } from "../model/model-utils";

interface UserMsg {
	message: string;
}

export const chatHandler = async (req: Request) => {
	try {
		let userMsg = await req.json();

		if (
			typeof userMsg !== "object" ||
			!(userMsg as UserMsg)?.message ||
			typeof (userMsg as UserMsg)?.message !== "string"
		) {
			return new Response(
				"Invalid data, must provide JSON with a 'message' property as a string.",
				{ status: 400 },
			);
		}
		// drop any properties that are not "message"
		userMsg = { message: (userMsg as UserMsg).message };
		console.log("Received JSON:", userMsg);
		const resp = await processUserInput((userMsg as UserMsg).message);
		return Response.json({ success: true, resp });
	} catch (error) {
		return new Response("An internal server error occured", { status: 500 });
	}
};
