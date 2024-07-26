import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Message from "./message";
import ChatBottombar from "./chat-box";
import { useChatStore } from "@/stores/useChatStore";
import { useWebSocket } from "@/socket";

type Props = {
  isAdminChat: boolean;
};

const Messages = ({ isAdminChat }: Props) => {
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const messages = useChatStore((state) => state.messages);
  
    useWebSocket();
  
    useEffect(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, [messages]);
  
    return (
      <div className="pt-14 h-svh w-full md:w-2/3 2xl:w-1/2 flex flex-col gap-2 text-[12px] 2xl:text-sm overflow-y-auto">
        <div className="flex-1 flex flex-col gap-2 text-[12px] 2xl:text-sm overflow-y-scroll px-2">
          <AnimatePresence initial={false}>
            {messages.map((message, idx) => (
              <motion.div
                className="w-full flex flex-col"
                key={message.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{
                  opacity: { duration: 0.1 },
                  layout: { duration: idx * 0.01 },
                  duration: 0.1,
                }}
              >
                <Message
                  key={message.id + idx}
                  sender={message.is_sender}
                  message={message.text}
                  time={message.time}
                />
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>
        <div className="py-4 border-t border-zinc-200 px-2">
          <ChatBottombar />
        </div>
      </div>
    );
  };
  

export default Messages;
