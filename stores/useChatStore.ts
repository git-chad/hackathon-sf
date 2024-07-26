import { create } from "zustand";

type Message = {
  id: number;
  text: string;
  is_sender: boolean;
  time: string;
};

type ChatStore = {
  messages: Message[];
  addMessage: (newMessage: Omit<Message, "id">) => void;
};

let messageId = 975;

export const useChatStore = create<ChatStore>((set) => ({
  messages: [],
  addMessage: (newMessage) =>
    set((state) => ({
      messages: [...state.messages, { id: messageId++, ...newMessage }],
    })),
}));
