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
				{ role: "system", content: "You are a helpful assistant in a conversation with a user." },
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
