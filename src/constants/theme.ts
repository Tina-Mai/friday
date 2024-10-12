import { TextStyle } from "react-native";

const COLORS = {
	bg: "#111115",
	primary: "#FCBA6F",
	dark: "#111115",
	black: "#000000",
	light: "#E4E4E4",
	white: "#FFFFFF",
	red: "#D45948",

	// grays are based off of iOS system grays: https://developer.apple.com/design/human-interface-guidelines/ios/visual-design/color/
	gray1: "#8E8E93",
	gray2: "#7C7C80",
	gray3: "#545456",
	gray4: "#444446",
	gray5: "#363638",
	gray6: "#242426",
	shadow: "#2E303F",
};

// can apply bolding to these with extra styling if needed; only largeTitle and headline are bolded
// based off of Apple's Human Interface Guidelines: https://developer.apple.com/design/human-interface-guidelines/ios/visual-design/typography/
const FONTS: {
	title: TextStyle;
	titleItalic: TextStyle;
	headline: TextStyle;
	body: TextStyle;
	subheadline: TextStyle;
	footnote: TextStyle;
	caption: TextStyle;
	caption2: TextStyle;
	link: TextStyle;
} = {
	title: {
		fontFamily: "PlayfairDisplay",
		fontSize: 28,
		lineHeight: 34,
		letterSpacing: 0.36,
		color: COLORS.white,
	},
	titleItalic: {
		fontFamily: "PlayfairDisplay-Italic",
		fontSize: 28,
		lineHeight: 34,
		letterSpacing: 0.36,
		color: COLORS.white,
	},
	headline: {
		fontSize: 17,
		fontWeight: "600",
		lineHeight: 22,
		color: COLORS.white,
	},
	body: {
		fontSize: 17,
		lineHeight: 22,
		color: COLORS.white,
	},
	subheadline: {
		fontSize: 15,
		lineHeight: 20,
		color: COLORS.white,
	},
	footnote: {
		fontSize: 13,
		lineHeight: 18,
		color: COLORS.white,
	},
	caption: {
		fontSize: 12,
		lineHeight: 16,
		color: COLORS.white,
	},
	caption2: {
		fontSize: 11,
		lineHeight: 13,
		letterSpacing: 0.07,
		color: COLORS.white,
	},
	link: {
		textDecorationLine: "underline",
	},
};

const SHADOWS = {
	color: COLORS.shadow,
	offset: { width: 3, height: 3 },
	opacity: 0.08,
	radius: 20,
	tabColor: COLORS.black,
	tabOffset: { width: 3, height: 3 },
	tabOpacity: 0.18,
	tabRadius: 15,
};

export { COLORS, FONTS, SHADOWS };
