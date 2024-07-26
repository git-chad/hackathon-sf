import { io, Socket } from "socket.io-client";
import { useEffect } from "react";
import { useChatStore } from "@/stores/useChatStore";
const URL = "http://localhost:3001";
export let socket: Socket;
export const useWebSocket = () => {
  const addMessage = useChatStore((state) => state.addMessage);
  useEffect(() => {
    console.log("Initializing WebSocket connection...");
    socket = io(URL, { transports: ["websocket"] });
    socket.on("connect", () => {
      console.log("Connected to server");
    });
    socket.on("messageFromServer", (data) => {
      console.log("Received message from server:", data);
      if (data) {
        console.log("Adding message to state:", data);
        addMessage({
          text: data,
          is_sender: false,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        });
      } else {
        console.error("Received undefined message from server");
      }
    });
    socket.on("error", (error) => {
      console.error("Error received from server:", error);
    });
    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });
    return () => {
      console.log("Closing WebSocket connection...");
      socket.close();
    };
  }, [addMessage]);
};
export const sendMessage = (chatMessage: string) => {
  console.log("Sending message:", chatMessage);
  if (socket) {
    socket.emit("messageToServer", chatMessage);
    console.log("Message sent:", chatMessage);
  } else {
    console.error("Socket is not initialized");
  }
};
