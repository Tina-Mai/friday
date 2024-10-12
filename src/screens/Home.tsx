import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import { screen, COLORS, FONTS } from "@/constants";

const Home = () => {
	return (
		<SafeAreaView style={screen.safe}>
			<View style={screen.container}>
				<View style={screen.content}>
					<Text style={FONTS.title}>Home</Text>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default Home;
