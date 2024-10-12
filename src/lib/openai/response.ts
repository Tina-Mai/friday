import OpenAI from "openai";
import { TranscriptEntry } from "@/types";

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

export const getOpenAIResponse = async (message: string, transcript: TranscriptEntry[]) => {
	try {
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
		});
		console.log("OPENAI RESPONSE:", response.choices[0].message.content);
		return response.choices[0].message.content;
	} catch (error) {
		console.error("Error getting response from OpenAI:", error);
		throw error;
	}
};
