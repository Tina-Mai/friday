import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MainStackParamList } from "@/types";

import Home from "@/screens/Home";

const MainStack = createNativeStackNavigator<MainStackParamList>();
const MainNavigator = () => {
	return (
		<MainStack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
			<MainStack.Screen name="Home" component={Home} />
		</MainStack.Navigator>
	);
};

export default MainNavigator;
