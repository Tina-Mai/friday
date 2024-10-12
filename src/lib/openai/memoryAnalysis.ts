import OpenAI from "openai";

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

export const analyzeMessageForMemory = async (message: string): Promise<string | null> => {
	try {
		const response = await openai.chat.completions.create({
			model: "gpt-4o-mini",
			messages: [
				{
					role: "system",
					content:
						"You are an AI assistant tasked with analyzing user messages to determine if they contain important information about the user that should be remembered. If you find such information, extract and format it concisely. If not, return null.",
				},
				{
					role: "user",
					content: `Analyze this message for information about the user that a helpful assistant should remember: "${message}"`,
				},
			],
		});

		const analysis = response.choices[0].message.content;
		if (analysis === "null") {
			console.log("No memory added");
		} else {
			console.log("Memory added:", analysis);
		}
		return analysis === "null" ? null : analysis;
	} catch (error) {
		console.error("Error in analyzeMessageForMemory:", error);
		return null;
	}
};
