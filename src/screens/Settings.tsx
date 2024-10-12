import React from "react";
import { View, Text, Modal } from "react-native";
import { screen, FONTS } from "@/constants";

export default function Settings({ show, setShow }: { show: boolean; setShow: (show: boolean) => void }) {
	return (
		<Modal visible={show} onRequestClose={() => setShow(false)} animationType="slide" presentationStyle="pageSheet" style={screen.container}>
			<View style={screen.content}>
				<Text style={FONTS.title}>Settings</Text>
			</View>
		</Modal>
	);
}
