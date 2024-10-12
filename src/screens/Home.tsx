import React, { useState, useRef, useEffect, useCallback } from "react";
import { SafeAreaView, View, Text, ScrollView, TextInput, KeyboardAvoidingView, Keyboard } from "react-native";
import { screen, inputArea, COLORS, FONTS } from "@/constants";
import Settings from "@/screens/Settings";
import Header from "@/components/Home/Header";
import Prompts from "@/components/Home/Prompts";
import MicButton from "@/components/Home/MicButton";
import Transcript from "@/components/Home/Transcript";
import Input from "@/components/Home/Input";
import { getOpenAIResponse } from "@/lib/openai/response";
import { TranscriptEntry } from "@/types";

export default function Home() {
	const [speaking, setSpeaking] = useState(false);
	const [userMessage, setUserMessage] = useState("");
	// this is the short-term memory. important user messages are saved in the long-term memory as we go.
	const [transcript, setTranscript] = useState<TranscriptEntry[]>([{ sender: "assistant", message: "Hey, I'm Friday. How can I help?" }]);
	const [showSettings, setShowSettings] = useState(false);

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
	const sendUserMessage = useCallback(async () => {
		if (!userMessage.trim()) return;

		addToTranscript({ sender: "user", message: userMessage });
		setUserMessage("");

		try {
			const openAIResponse = await getOpenAIResponse(userMessage, transcript);
			addToTranscript({ sender: "assistant", message: openAIResponse || "" });
		} catch (error) {
			console.error("Error in sendUserMessage:", error);
		}
	}, [userMessage, transcript, addToTranscript]);

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
					<Input userMessage={userMessage} setUserMessage={setUserMessage} sendUserMessage={sendUserMessage} speaking={speaking} />
				</KeyboardAvoidingView>
			</ScrollView>

			<Settings show={showSettings} setShow={setShowSettings} />
		</SafeAreaView>
	);
}
