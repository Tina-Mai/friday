import { TextStyle, ViewStyle, ImageStyle } from "react-native";
import { COLORS, FONTS } from "../theme";

const wrapper: ViewStyle = {
	width: "100%",
	paddingVertical: 12,
	paddingHorizontal: 20,
	backgroundColor: COLORS.gray5,
	borderRadius: 60,
	flexDirection: "row",
	justifyContent: "flex-start",
	alignItems: "center",
	gap: 10,
};
const text: TextStyle = {
	width: "90%",
	...FONTS.body,
};
const icon: ImageStyle = {
	width: 20,
	height: 20,
	tintColor: COLORS.gray1,
};
export const inputArea = {
	wrapper,
	text,
	icon,
};
