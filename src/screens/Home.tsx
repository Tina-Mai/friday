import React, { useState } from "react";
import { SafeAreaView, View, Text, ScrollView, TextInput, KeyboardAvoidingView } from "react-native";
import { screen, inputArea, COLORS, FONTS } from "@/constants";
import Settings from "@/screens/Settings";
import Header from "@/components/Home/Header";
import Prompts from "@/components/Home/Prompts";
import MicButton from "@/components/Home/MicButton";

export default function Home() {
	const [speaking, setSpeaking] = useState(false);
	const [showSettings, setShowSettings] = useState(false);

	return (
		<SafeAreaView style={{ ...screen.safe, backgroundColor: speaking ? COLORS.light : COLORS.bg }}>
			<View style={{ ...screen.container, justifyContent: "space-between", backgroundColor: speaking ? COLORS.light : COLORS.bg, marginBottom: -75 }}>
				<KeyboardAvoidingView behavior={"padding"} style={{ ...screen.content, flex: 1 }}>
					<Header isSpeaking={speaking} onOpenSettings={() => setShowSettings(true)} />

					{/* transcript */}
					<ScrollView style={{ marginTop: 20 }} contentContainerStyle={{ flexGrow: 1, justifyContent: "flex-end" }} keyboardShouldPersistTaps="handled">
						{/* text styling: while speaking, text is italicized; if text is from user, text is gray; if text is from assistant, speaking ? COLORS.black : COLORS.white; */}
						<Text style={{ ...FONTS.title, color: speaking ? COLORS.black : COLORS.white }}>Hey, I'm Friday. How can I help?</Text>
					</ScrollView>

					{/* show when nothing has been said yet */}
					<Prompts speaking={speaking} />

					{/* mic button */}
					<MicButton speaking={speaking} setSpeaking={setSpeaking} />

					{/* input */}
					<View>
						<View style={{ ...inputArea.wrapper, backgroundColor: speaking ? "#D1D1D6" : "#2C2C2E" }}>
							<TextInput style={{ ...inputArea.text, width: "102%" }} placeholder="Type something..." placeholderTextColor={COLORS.gray1} clearButtonMode="while-editing" />
						</View>
						{/* adding extra space so that KeyboardAvoidingView looks good */}
						<View style={{ height: 85 }} />
					</View>
				</KeyboardAvoidingView>
			</View>

			<Settings show={showSettings} setShow={setShowSettings} />
		</SafeAreaView>
	);
}
