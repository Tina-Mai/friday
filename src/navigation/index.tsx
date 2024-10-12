import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainNavigator from "./MainNavigator";

export default () => {
	return (
		<NavigationContainer>
			<MainNavigator />
		</NavigationContainer>
	);
};
