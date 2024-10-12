import React from "react";
import { View, TextInput } from "react-native";
import { inputArea, COLORS } from "@/constants";

interface InputProps {
	userMessage: string;
	setUserMessage: (message: string) => void;
	sendUserMessage: () => void;
	speaking: boolean;
}

const Input: React.FC<InputProps> = ({ userMessage, setUserMessage, sendUserMessage, speaking }) => {
	return (
		<View>
			<View style={{ ...inputArea.wrapper, backgroundColor: speaking ? "#D1D1D6" : COLORS.gray5 }}>
				<TextInput
					value={userMessage}
					onChangeText={setUserMessage}
					onSubmitEditing={sendUserMessage}
					style={{ ...inputArea.text, width: "102%" }}
					placeholder="Type something..."
					placeholderTextColor={COLORS.gray1}
					clearButtonMode="while-editing"
				/>
			</View>
			{/* adding extra space so that KeyboardAvoidingView looks good */}
			<View style={{ height: 85 }} />
		</View>
	);
};

export default Input;
