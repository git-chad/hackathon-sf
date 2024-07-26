import { io } from "socket.io-client";
import { useEffect } from "react";
import { useChatStore } from "@/stores/useChatStore";

const URL = process.env.NEXT_PUBLIC_BACKURL;

export const socket = io(URL as string);

export const useWebSocket = () => {
  const addMessage = useChatStore((state) => state.addMessage);

  useEffect(() => {
    console.log("Initializing WebSocket connection...");
  
    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("messageToServer", () => {
      console.log("Sending a message");
    });
  
    socket.on("messageFromServer", (data) => {
      const { chatId: incomingChatId, message } = data;
      console.log("Received new message on chatId:", incomingChatId);
      console.log("Received new message:", message);
  
      addMessage(message);
    });
  
    return () => {
      console.log("Closing WebSocket connection...");
      socket.close();
    };
  }, [addMessage]);
};
