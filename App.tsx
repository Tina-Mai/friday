import * as React from "react";
import { useCallback } from "react";
import { View, LogBox } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import Navigation from "@/navigation";
import { MemoryProvider } from "@/context/MemoryContext";

SplashScreen.preventAutoHideAsync();

LogBox.ignoreLogs(["Error stopping recording and transcribing: [Error: No recording in progress]"]);
LogBox.ignoreAllLogs();

export default function App() {
	// load fonts
	const [fontsLoaded, fontError] = useFonts({
		PlayfairDisplay: require("@/assets/fonts/PlayfairDisplay/PlayfairDisplay-Regular.ttf"),
		PlayfairDisplayItalic: require("@/assets/fonts/PlayfairDisplay/PlayfairDisplay-Italic.ttf"),
	});

	// after custom fonts have loaded, hide splash screen and display app screen
	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded || fontError) {
			await SplashScreen.hideAsync();
		}
	}, [fontsLoaded, fontError]);

	if (!fontsLoaded && !fontError) {
		return null;
	}

	return (
		<MemoryProvider>
			<View style={{ flex: 1 }} onLayout={onLayoutRootView}>
				<Navigation />
			</View>
		</MemoryProvider>
	);
}
