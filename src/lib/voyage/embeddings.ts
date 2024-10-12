import { VoyageAIClient } from "voyageai";
import { TranscriptEntry } from "@/types";

const voyageai = new VoyageAIClient({
	apiKey: process.env.VOYAGE_API_KEY,
});

async function getEmbedding(text: string): Promise<number[]> {
	const response = await voyageai.embed({
		model: "voyage-3-lite",
		input: text,
	});
	return response.data?.[0]?.embedding ?? [];
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

	const transcriptSimilarities = transcriptEmbeddings.map((embedding, index) => ({
		similarity: cosineSimilarity(queryEmbedding, embedding),
		entry: transcript[index],
	}));

	const memorySimilarities = memoryEmbeddings.map((embedding, index) => ({
		similarity: cosineSimilarity(queryEmbedding, embedding),
		memory: memories[index],
	}));

	const k = 5; // number of top results to return
	const relevantTranscript = transcriptSimilarities
		.sort((a, b) => b.similarity - a.similarity)
		.slice(0, k)
		.map((item) => `${item.entry.sender}: ${item.entry.message}`);

	const relevantMemories = memorySimilarities
		.sort((a, b) => b.similarity - a.similarity)
		.slice(0, k)
		.map((item) => item.memory);

	const relevantInfo = [...relevantTranscript, ...relevantMemories].join("\n");
	console.log("relevant info:", relevantInfo);

	return relevantInfo;
}
