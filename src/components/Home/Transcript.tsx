import React from "react";
import { ScrollView, Text } from "react-native";
import { FONTS, COLORS } from "@/constants";
import { TranscriptEntry } from "@/types";

interface TranscriptProps {
	transcript: TranscriptEntry[];
	speaking: boolean;
	scrollViewRef: React.RefObject<ScrollView>;
}

const Transcript: React.FC<TranscriptProps> = ({ transcript, speaking, scrollViewRef }) => {
	return (
		<ScrollView
			ref={scrollViewRef}
			style={{ marginTop: 20 }}
			contentContainerStyle={{ flexGrow: 1, justifyContent: "flex-end", gap: 25 }}
			keyboardShouldPersistTaps="handled"
			showsVerticalScrollIndicator={false}
		>
			{transcript.map((entry, index) => (
				<Text
					key={index}
					style={{
						...FONTS.title,
						color: entry.sender === "user" ? COLORS.gray1 : speaking ? COLORS.black : COLORS.white,
					}}
				>
					{entry.message}
				</Text>
			))}
		</ScrollView>
	);
};

export default Transcript;
