import React from "react";
import { View, Text, ScrollView } from "react-native";
import { COLORS, FONTS } from "@/constants";

const Prompts = ({ speaking }: { speaking: boolean }) => {
	const promptTexts = ["Hey Friday, catch me up on my week ahead", "Check where my CS 238 class is meeting", "Read the research papers on my desktop", "What projects are due this week?"];

	const PromptItem = ({ text }: { text: string }) => {
		return (
			<View style={{ maxWidth: 180, padding: 10, borderRadius: 15, backgroundColor: speaking ? "#D1D1D6" : COLORS.gray5 }}>
				<Text style={{ ...FONTS.subheadline, color: speaking ? COLORS.black : COLORS.white }} numberOfLines={2}>
					{text}
				</Text>
			</View>
		);
	};

	return (
		<ScrollView horizontal style={{ flexDirection: "row", maxHeight: 85, paddingTop: 20 }} contentContainerStyle={{ alignItems: "center", gap: 10 }} showsHorizontalScrollIndicator={false}>
			{promptTexts.map((text, index) => (
				<PromptItem key={index} text={text} />
			))}
		</ScrollView>
	);
};

export default Prompts;
