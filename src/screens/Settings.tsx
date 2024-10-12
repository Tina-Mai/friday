import React, { useState } from "react";
import { View, Text, Modal, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { screen, inputArea, COLORS, FONTS } from "@/constants";
import { Brain, X, Plus } from "lucide-react-native";
import { useMemory } from "@/context/MemoryContext";

export default function Settings({ show, setShow }: { show: boolean; setShow: (show: boolean) => void }) {
	const { memories, addMemory, removeMemory } = useMemory();
	const [newMemory, setNewMemory] = useState("");

	const MemoryItem = ({ memory }: { memory: string }) => {
		return (
			<View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 15, borderRadius: 10, backgroundColor: COLORS.gray6 }}>
				<Text style={FONTS.subheadline}>{memory}</Text>
				<TouchableOpacity onPress={() => removeMemory(memory)}>
					<X size={12} color="white" style={{ paddingHorizontal: 10 }} />
				</TouchableOpacity>
			</View>
		);
	};

	return (
		<Modal visible={show} onRequestClose={() => setShow(false)} animationType="slide" presentationStyle="pageSheet">
			<ScrollView scrollEnabled={false} style={screen.container}>
				<View style={{ ...screen.content, flex: 1, gap: 20 }}>
					<View style={{ width: 45, height: 5, borderRadius: 20, backgroundColor: COLORS.gray2, alignSelf: "center" }} />
					{/* memories header */}
					<View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
						<Brain size={25} color="white" strokeWidth={1.5} />
						<Text style={FONTS.title}>Memories</Text>
					</View>

					{/* add memory input */}
					<View style={{ flexDirection: "row", gap: 15 }}>
						<TextInput
							placeholder="Tell Friday about yourself..."
							style={{ ...inputArea.text, borderBottomWidth: 1, borderColor: COLORS.gray4, paddingBottom: 8, backgroundColor: "transparent", width: "89%" }}
							placeholderTextColor={COLORS.gray1}
							clearButtonMode="while-editing"
							value={newMemory}
							onChangeText={setNewMemory}
						/>
						<TouchableOpacity
							onPress={() => {
								if (newMemory.trim()) {
									addMemory(newMemory.trim());
									setNewMemory("");
								}
							}}
							style={{ height: 25, width: 25, backgroundColor: COLORS.light, borderRadius: 50, justifyContent: "center", alignItems: "center" }}
						>
							<Plus size={15} color="black" strokeWidth={2} />
						</TouchableOpacity>
					</View>

					{/* memories list */}
					<ScrollView contentContainerStyle={{ flexGrow: 1, gap: 10 }}>
						{memories.map((memory, index) => (
							<MemoryItem key={index} memory={memory} />
						))}
					</ScrollView>
				</View>
			</ScrollView>
		</Modal>
	);
}
