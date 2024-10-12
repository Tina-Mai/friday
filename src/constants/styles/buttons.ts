import { TextStyle, ViewStyle, ImageStyle } from "react-native";
import { COLORS, FONTS, SHADOWS } from "../theme";

const circleButtonWrapper: ViewStyle = {
	width: 55,
	height: 55,
	backgroundColor: COLORS.primary,
	borderRadius: 60,
	justifyContent: "center",
	alignItems: "center",
	shadowColor: SHADOWS.color,
	shadowOffset: SHADOWS.offset,
	shadowOpacity: SHADOWS.opacity,
	shadowRadius: SHADOWS.radius,
};
const circleButtonIcon: TextStyle = {
	fontSize: 25,
	color: COLORS.white,
};
const textButtonWrapper: ViewStyle = {
	width: "100%",
	backgroundColor: COLORS.black,
	borderRadius: 60,
	flexDirection: "row",
	justifyContent: "space-around",
	// justifyContent: "center",
	alignItems: "center",
	shadowColor: SHADOWS.color,
	shadowOffset: SHADOWS.offset,
	shadowOpacity: SHADOWS.opacity,
	shadowRadius: SHADOWS.radius,
	paddingVertical: 15,
	// paddingHorizontal: 15,
};
const textButtonText: TextStyle = {
	width: "100%",
	textAlign: "center",
	fontSize: FONTS.headline.fontSize,
	fontWeight: FONTS.headline.fontWeight,
	color: COLORS.white,
};
const pillButtonWrapper: ViewStyle = {
	backgroundColor: COLORS.gray4,
	borderRadius: 60,
	flexDirection: "row",
	alignSelf: "flex-start",
	alignItems: "center",
	paddingVertical: 6,
	paddingHorizontal: 12,
	gap: 10,
};
const pillButtonIcon: ImageStyle = {
	width: 16,
	height: 16,
};
const pillButtonText: TextStyle = {
	fontSize: FONTS.subheadline.fontSize,
	fontWeight: "600",
	color: COLORS.white,
};

export const buttons = {
	circleButtonWrapper,
	circleButtonIcon,
	textButtonWrapper,
	textButtonText,
	pillButtonWrapper,
	pillButtonIcon,
	pillButtonText,
};
