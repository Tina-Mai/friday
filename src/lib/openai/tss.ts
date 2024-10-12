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

		// convert ArrayBuffer to Base64
		const base64Audio = Buffer.from(audioData).toString("base64");

		// save the audio file temporarily
		const fileUri = FileSystem.documentDirectory + "temp_audio.mp3";
		await FileSystem.writeAsStringAsync(fileUri, base64Audio, { encoding: FileSystem.EncodingType.Base64 });

		// play the audio
		const soundObject = new Audio.Sound();
		await soundObject.loadAsync({ uri: fileUri });

		// set the volume to maximum (1.0)
		await soundObject.setVolumeAsync(1.0);

		await soundObject.playAsync();

		// optional: delete the file after playing
		// await FileSystem.deleteAsync(fileUri);
	} catch (error) {
		console.error("Error in speakMessage:", error);
		throw error;
	}
};
