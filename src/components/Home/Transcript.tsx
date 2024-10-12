import React from "react";
import { View, ScrollView, Text, ActivityIndicator } from "react-native";
import { FONTS, COLORS } from "@/constants";
import { TranscriptEntry } from "@/types";

interface TranscriptProps {
	transcript: TranscriptEntry[];
	speaking: boolean;
	scrollViewRef: React.RefObject<ScrollView>;
	loading: boolean;
}

const Transcript: React.FC<TranscriptProps> = ({ transcript, speaking, scrollViewRef, loading }) => {
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
			{loading && (
				<View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
					<ActivityIndicator size="small" color={COLORS.gray1} />
					<Text style={{ ...FONTS.titleItalic, color: COLORS.gray1 }}>Thinking...</Text>
				</View>
			)}
		</ScrollView>
	);
};

export default Transcript;
