import { View, Text, Image, TouchableOpacity } from "react-native";
import { Settings } from "lucide-react-native";
import { images, buttons, COLORS, FONTS } from "@/constants";
import { TranscriptEntry } from "@/types";

const Header = ({ speaking, onOpenSettings, setTranscript }: { speaking: boolean; onOpenSettings: () => void; setTranscript: (transcript: TranscriptEntry[]) => void }) => {
	return (
		<View style={{ justifyContent: "space-between", flexDirection: "row", alignItems: "center" }}>
			<Image source={images.logo} style={{ width: 24, height: 24, tintColor: speaking ? COLORS.black : COLORS.white }} />

			<View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
				<TouchableOpacity
					onPress={() => setTranscript([{ sender: "assistant", message: "Hey, I'm Friday. How can I help?" }])}
					style={{ ...buttons.pillButtonWrapper, backgroundColor: speaking ? "#D1D1D6" : COLORS.gray3 }}
				>
					<Text style={{ ...buttons.pillButtonText, ...FONTS.footnote, color: speaking ? COLORS.black : COLORS.white }}>+ New chat</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={onOpenSettings}>
					<Settings color={speaking ? "black" : "white"} size={28} strokeWidth={1.5} />
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default Header;
