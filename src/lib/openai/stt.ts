import OpenAI from "openai";
import { Audio } from "expo-av";

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

let recording: Audio.Recording | null = null;

export const startRecording = async (): Promise<void> => {
	try {
		await Audio.requestPermissionsAsync();
		await Audio.setAudioModeAsync({
			allowsRecordingIOS: true,
			playsInSilentModeIOS: true,
		});

		console.log("Starting new recording");
		recording = new Audio.Recording();
		await recording.prepareToRecordAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
		await recording.startAsync();
	} catch (error) {
		console.error("Failed to start recording", error);
		throw error;
	}
};

export const stopRecordingAndTranscribe = async (): Promise<string> => {
	if (!recording) {
		throw new Error("No recording in progress");
	}

	try {
		console.log("Stopping recording");
		await recording.stopAndUnloadAsync();

		const uri = recording.getURI();
		if (!uri) {
			throw new Error("Failed to get recording URI");
		}

		console.log("Recording URI:", uri);

		// create a FormData object and append the audio file
		const formData = new FormData();
		formData.append("file", {
			uri: uri,
			type: "audio/m4a",
			name: "audio.m4a",
		} as any);
		formData.append("model", "whisper-1");

		// send the request to OpenAI API
		const response = await fetch("https://api.openai.com/v1/audio/transcriptions", {
			method: "POST",
			headers: {
				Authorization: `Bearer ${openai.apiKey}`,
			},
			body: formData,
		});

		if (!response.ok) {
			throw new Error(`OpenAI API responded with status ${response.status}`);
		}

		const transcription = await response.json();
		console.log("Transcription:", transcription);

		return transcription.text;
	} catch (error) {
		console.error("Failed to stop recording or transcribe", error);
		throw error;
	}
};
