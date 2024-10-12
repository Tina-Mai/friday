import { View, Text, TouchableOpacity } from "react-native";
import { screen, COLORS } from "@/constants";

const MicButton = ({ speaking, setSpeaking }: { speaking: boolean; setSpeaking: (speaking: boolean) => void }) => {
	return (
		<TouchableOpacity
			style={{ width: 115, height: 115, backgroundColor: speaking ? COLORS.dark : COLORS.white, borderRadius: 100, alignSelf: "center", marginVertical: 45 }}
			onPressIn={() => setSpeaking(true)}
			onPressOut={() => setSpeaking(false)}
			activeOpacity={1}
		/>
	);
};

export default MicButton;
