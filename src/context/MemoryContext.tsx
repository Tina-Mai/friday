import React, { createContext, useState, useContext, ReactNode } from "react";

interface MemoryContextType {
	memories: string[];
	addMemory: (memory: string) => void;
	removeMemory: (memory: string) => void;
}

const MemoryContext = createContext<MemoryContextType | undefined>(undefined);

export const MemoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [memories, setMemories] = useState<string[]>([
		"User's name is Tina",
		"User is a student at Stanford University",
		"CS 222 course website: https://joonspk-research.github.io/cs222-fall24",
		"CS 109 course website: https://web.stanford.edu/class/cs109/",
		"CS 238 course website: https://aa228.stanford.edu/",
	]);

	const addMemory = (memory: string) => {
		if (memory.trim()) {
			setMemories([...memories, memory.trim()]);
		}
	};

	const removeMemory = (memory: string) => {
		setMemories(memories.filter((m) => m !== memory));
	};

	return <MemoryContext.Provider value={{ memories, addMemory, removeMemory }}>{children}</MemoryContext.Provider>;
};

export const useMemory = () => {
	const context = useContext(MemoryContext);
	if (context === undefined) {
		throw new Error("useMemory must be used within a MemoryProvider");
	}
	return context;
};
