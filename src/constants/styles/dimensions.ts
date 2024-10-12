import { Dimensions } from "react-native";
import { screen } from "./screen";

export const dimensions = {
	fullHeight: Dimensions.get("window").height,
	fullWidth: Dimensions.get("window").width,
	contentWidth: Dimensions.get("window").width - (Number(screen.container.paddingHorizontal) + Number(screen.content.paddingHorizontal)) * 2,
};
