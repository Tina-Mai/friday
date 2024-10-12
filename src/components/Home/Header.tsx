import { View, Image, TouchableOpacity } from "react-native";
import { Settings } from "lucide-react-native";
import { images, COLORS } from "@/constants";

const Header = ({ isSpeaking, onOpenSettings }: { isSpeaking: boolean; onOpenSettings: () => void }) => {
	return (
		<View style={{ justifyContent: "space-between", flexDirection: "row", alignItems: "center" }}>
			<Image source={images.logo} style={{ width: 24, height: 24, tintColor: isSpeaking ? COLORS.black : COLORS.white }} />

			<TouchableOpacity onPress={onOpenSettings}>
				<Settings color={isSpeaking ? "black" : "white"} size={28} strokeWidth={1.5} />
			</TouchableOpacity>
		</View>
	);
};

export default Header;
