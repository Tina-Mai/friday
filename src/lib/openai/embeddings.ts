import OpenAI from "openai";
import { TranscriptEntry } from "@/types";

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

async function getEmbedding(text: string): Promise<number[]> {
	const response = await openai.embeddings.create({
		model: "text-embedding-ada-002",
		input: text,
	});
	return response.data[0].embedding;
}

function cosineSimilarity(a: number[], b: number[]): number {
	const dotProduct = a.reduce((sum, _, i) => sum + a[i] * b[i], 0);
	const magnitudeA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
	const magnitudeB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
	return dotProduct / (magnitudeA * magnitudeB);
}

export async function getRelevantInformation(query: string, transcript: TranscriptEntry[], memories: string[]): Promise<string> {
	const queryEmbedding = await getEmbedding(query);

	const transcriptEmbeddings = await Promise.all(transcript.map((entry) => getEmbedding(`${entry.sender}: ${entry.message}`)));

	const memoryEmbeddings = await Promise.all(memories.map(getEmbedding));

	const relevantTranscript = transcript.filter((_, index) => cosineSimilarity(queryEmbedding, transcriptEmbeddings[index]) > 0.7);

	const relevantMemories = memories.filter((_, index) => cosineSimilarity(queryEmbedding, memoryEmbeddings[index]) > 0.7);

	const relevantInfo = [...relevantTranscript.map((entry) => `${entry.sender}: ${entry.message}`), ...relevantMemories].join("\n");
	console.log("relevant info:", relevantInfo);

	return relevantInfo;
}
