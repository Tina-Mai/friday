import OpenAI from "openai";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";
import { Buffer } from "buffer";

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

export const speakMessage = async (message: string): Promise<void> => {
	try {
		const response = await openai.audio.speech.create({
			model: "tts-1",
			voice: "nova",
			input: message,
		});

		const audioData = await response.arrayBuffer();

		// Convert ArrayBuffer to Base64
		const base64Audio = Buffer.from(audioData).toString("base64");

		// Save the audio file temporarily
		const fileUri = FileSystem.documentDirectory + "temp_audio.mp3";
		await FileSystem.writeAsStringAsync(fileUri, base64Audio, { encoding: FileSystem.EncodingType.Base64 });

		// Play the audio
		const soundObject = new Audio.Sound();
		await soundObject.loadAsync({ uri: fileUri });
		await soundObject.playAsync();

		// Optional: Delete the file after playing
		// await FileSystem.deleteAsync(fileUri);
	} catch (error) {
		console.error("Error in speakMessage:", error);
		throw error;
	}
};
