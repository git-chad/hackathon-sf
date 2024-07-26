import { create } from "zustand";

type Message = {
  id: number;
  text: string;
  is_sender: boolean;
  time: string;
};

type ChatStore = {
  messages: Message[];
  suggestions: string[];
  addMessage: (newMessage: Omit<Message, "id">) => void;
  setSuggestions: (suggestions: string[]) => void;
};

let messageId = 975;

export const useChatStore = create<ChatStore>((set) => ({
  messages: [],
  suggestions: [],
  addMessage: (newMessage) =>
    set((state) => ({
      messages: [...state.messages, { id: messageId++, ...newMessage }],
    })),
  setSuggestions: (suggestions) => set(() => ({ suggestions })),
}));
