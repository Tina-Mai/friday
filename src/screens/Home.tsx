import React, { useState, useRef, useEffect, useCallback } from "react";
import { SafeAreaView, ScrollView, KeyboardAvoidingView, Keyboard } from "react-native";
import { screen, COLORS } from "@/constants";
import Settings from "@/screens/Settings";
import Header from "@/components/Home/Header";
import Prompts from "@/components/Home/Prompts";
import MicButton from "@/components/Home/MicButton";
import Transcript from "@/components/Home/Transcript";
import Input from "@/components/Home/Input";
import { getOpenAIResponse } from "@/lib/openai/response";
import { TranscriptEntry } from "@/types";
import { useMemory } from "@/context/MemoryContext";
import { startRecording, stopRecordingAndTranscribe } from "@/lib/openai/stt";
import { speakMessage } from "@/lib/openai/tss";

export default function Home() {
	const [speaking, setSpeaking] = useState(false);
	const [userMessage, setUserMessage] = useState("");
	const [transcript, setTranscript] = useState<TranscriptEntry[]>([{ sender: "assistant", message: "Hey, I'm Friday. How can I help?" }]);
	const [showSettings, setShowSettings] = useState(false);
	const { memories } = useMemory();

	// STT
	useEffect(() => {
		let isMounted = true;
		const handleRecording = async () => {
			if (speaking) {
				try {
					console.log("Starting recording");
					await startRecording();
				} catch (error) {
					console.error("Error starting recording:", error);
				}
			} else {
				try {
					console.log("Stopping recording and transcribing");
					const transcription = await stopRecordingAndTranscribe();
					if (isMounted) {
						setUserMessage(transcription);
						sendUserMessage(transcription);
					}
				} catch (error) {
					console.error("Error stopping recording and transcribing:", error);
				}
			}
		};
		handleRecording();
		return () => {
			isMounted = false;
		};
	}, [speaking]);

	// scroll to bottom
	const scrollViewRef = useRef<ScrollView>(null);
	const scrollToBottom = useCallback(() => {
		setTimeout(() => {
			scrollViewRef.current?.scrollToEnd({ animated: true });
		}, 100);
	}, []);

	useEffect(() => {
		scrollToBottom();
	}, [transcript, scrollToBottom]);

	useEffect(() => {
		const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", scrollToBottom);

		return () => {
			keyboardDidShowListener.remove();
		};
	}, [scrollToBottom]);

	// add to transcript
	const addToTranscript = useCallback((entry: TranscriptEntry) => {
		setTranscript((prevTranscript) => [...prevTranscript, entry]);
	}, []);

	// send user message
	const sendUserMessage = useCallback(
		async (message: string) => {
			if (!message.trim()) return;

			addToTranscript({ sender: "user", message });
			setUserMessage("");

			try {
				const openAIResponse = await getOpenAIResponse(message, transcript, memories);
				// speak the assistant's response
				await speakMessage(openAIResponse || "");
				// add to transcript
				addToTranscript({ sender: "assistant", message: openAIResponse || "" });
			} catch (error) {
				console.error("Error in sendUserMessage:", error);
				addToTranscript({ sender: "assistant", message: "Oops, I encountered an error while processing your request. Please try again." });
				setUserMessage("");
			}
		},
		[transcript, addToTranscript, memories]
	);

	return (
		<SafeAreaView style={{ ...screen.safe, backgroundColor: speaking ? COLORS.light : COLORS.bg }}>
			<ScrollView
				scrollEnabled={false}
				style={{ ...screen.container, backgroundColor: speaking ? COLORS.light : COLORS.bg, marginBottom: -75 }}
				contentContainerStyle={{ flex: 1, justifyContent: "space-between" }}
			>
				<KeyboardAvoidingView behavior={"padding"} style={{ ...screen.content, flex: 1 }}>
					<Header speaking={speaking} onOpenSettings={() => setShowSettings(true)} setTranscript={setTranscript} />
					{/* transcript */}
					<Transcript transcript={transcript} speaking={speaking} scrollViewRef={scrollViewRef} />
					{/* show prompts when nothing has been said yet */}
					{transcript.length <= 1 && <Prompts speaking={speaking} />}
					{/* mic button */}
					<MicButton speaking={speaking} setSpeaking={setSpeaking} />
					{/* input */}
					<Input userMessage={userMessage} setUserMessage={setUserMessage} sendUserMessage={() => sendUserMessage(userMessage)} speaking={speaking} />
				</KeyboardAvoidingView>
			</ScrollView>

			<Settings show={showSettings} setShow={setShowSettings} />
		</SafeAreaView>
	);
}
