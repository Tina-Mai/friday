import React, { useState } from "react";
import { SafeAreaView, View, Text, TouchableOpacity } from "react-native";
import { screen, COLORS, FONTS } from "@/constants";
import Header from "@/components/Home/Header";

export default function Home() {
	const [speaking, setSpeaking] = useState(false);

	return (
		<SafeAreaView style={{ ...screen.safe, backgroundColor: speaking ? COLORS.light : COLORS.bg }}>
			<View style={{ ...screen.container, justifyContent: "space-between", backgroundColor: speaking ? COLORS.light : COLORS.bg }}>
				<Header isSpeaking={speaking} />

				{/* transcript */}
				<View style={screen.content}>
					<Text style={{ ...FONTS.title, color: speaking ? COLORS.black : COLORS.white }}>Home</Text>
				</View>

				{/* mic button */}
				<TouchableOpacity
					style={{ width: 125, height: 125, backgroundColor: speaking ? COLORS.black : COLORS.white, borderRadius: 100, alignSelf: "center" }}
					onPressIn={() => setSpeaking(true)}
					onPressOut={() => setSpeaking(false)}
					activeOpacity={1}
				/>
			</View>
		</SafeAreaView>
	);
}
