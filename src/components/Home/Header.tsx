import { View, TouchableOpacity } from "react-native";
import { Settings } from "lucide-react-native";

const Header = ({ isSpeaking }: { isSpeaking: boolean }) => {
	return (
		<View style={{ justifyContent: "space-between", flexDirection: "row", alignItems: "center" }}>
			<View />
			<TouchableOpacity>
				<Settings color={isSpeaking ? "black" : "white"} size={28} strokeWidth={1.5} />
			</TouchableOpacity>
		</View>
	);
};

export default Header;
