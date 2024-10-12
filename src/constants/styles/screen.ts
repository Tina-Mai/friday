import { Platform, StatusBar, ViewStyle } from "react-native";
import { COLORS } from "../theme";

const container: ViewStyle = {
	flex: 1,
	backgroundColor: COLORS.bg,
	paddingHorizontal: 16,
	paddingTop: 12,
	// paddingVertical: 12,
	// paddingTop: 60,
	// paddingBottom: 30,
};

const content: ViewStyle = {
	paddingHorizontal: 10,
};

const withTabBar: ViewStyle = {
	paddingBottom: 155,
};

// styling for SafeAreaView
const safe: ViewStyle = {
	flex: 1,
	backgroundColor: COLORS.bg,
	paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0, // add padding for Android
};

export const screen = { container, content, withTabBar, safe };
