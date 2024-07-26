"use client"

import Messages from "@/components/chat/messages";

export default function Home() {
  return (
    <div className="min-h-screen w-full container flex justify-center">
      <Messages />
    </div>
  );
}
