import OpenAI from "openai";
import { TranscriptEntry } from "@/types";
import { webSearch } from "@/lib/bing/webSearch";

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

const functions = [
	{
		name: "web_search",
		description: "Search the web for current information",
		parameters: {
			type: "object",
			properties: {
				query: {
					type: "string",
					description: "The search query",
				},
			},
			required: ["query"],
		},
	},
];

export const getOpenAIResponse = async (message: string, transcript: TranscriptEntry[]) => {
	try {
		console.log("Starting getOpenAIResponse function");
		console.log("User message:", message);

		// First API call to OpenAI
		console.log("Making initial API call to OpenAI");
		const response = await openai.chat.completions.create({
			model: "gpt-4o",
			messages: [
				{
					role: "system",
					content:
						"You are Friday, a helpful, supportive, and witty assistant for a smart university student. Your messages are being read aloud to the user, so keep your responses concise (3 or less sentences). Do not use markdown; only respond in plain text. You have the ability to search the web for current information when needed.",
				},
				{
					role: "user",
					content: message + "\n\nFor context, here is the conversation history before this: " + transcript.map((entry) => `${entry.sender}: ${entry.message}`).join("\n"),
				},
			],
			functions: functions,
			function_call: "auto",
		});

		const responseMessage = response.choices[0].message;
		console.log("Initial OpenAI response received");

		if (responseMessage.function_call) {
			console.log("Function call detected:", responseMessage.function_call.name);
			const functionName = responseMessage.function_call.name;
			const functionArgs = JSON.parse(responseMessage.function_call.arguments);

			if (functionName === "web_search") {
				console.log("Executing web search function");
				console.log("Search query:", functionArgs.query);
				const searchResults = await webSearch(functionArgs.query);
				console.log("Web search results received");

				// Format search results for GPT
				const formattedResults = searchResults.join("\n\n");

				// Second API call to OpenAI with search results
				console.log("Making second API call to OpenAI with search results");
				const secondResponse = await openai.chat.completions.create({
					model: "gpt-4o-mini",
					messages: [
						{
							role: "system",
							content:
								"You are a helpful assistant. Provide a direct and concise answer based on the web search results. Do not mention the sources or that you performed a web search. Just give the information as if you knew it.",
						},
						{
							role: "user",
							content: message,
						},
						{
							role: "function",
							name: "web_search",
							content: formattedResults,
						},
					],
				});

				console.log("Second OpenAI response received");
				return secondResponse.choices[0].message.content;
			}
		}

		console.log("Returning initial OpenAI response");
		return responseMessage.content;
	} catch (error) {
		console.error("Error in getOpenAIResponse:", error);
		throw error;
	}
};
