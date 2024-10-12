import React, { useState } from "react";
import { SafeAreaView, View, Text, TouchableOpacity, ScrollView, TextInput, KeyboardAvoidingView } from "react-native";
import { screen, inputArea, COLORS, FONTS } from "@/constants";
import Header from "@/components/Home/Header";
import Settings from "@/screens/Settings";
import Prompts from "@/components/Home/Prompts";

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

					<Prompts speaking={speaking} />

					{/* mic button */}
					<TouchableOpacity
						style={{ width: 115, height: 115, backgroundColor: speaking ? COLORS.black : COLORS.white, borderRadius: 100, alignSelf: "center", marginVertical: 45 }}
						onPressIn={() => setSpeaking(true)}
						onPressOut={() => setSpeaking(false)}
						activeOpacity={1}
					/>

					{/* input */}
					<View>
						<View style={{ ...inputArea.wrapper, backgroundColor: speaking ? "#E1E1E4" : COLORS.gray5 }}>
							<TextInput style={inputArea.text} placeholder="Type something..." placeholderTextColor={speaking ? "#AEAEB2" : COLORS.gray1} />
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
