"use client";
import Messages from "@/components/chat/messages";

const SupportPage = () => {
  return (
    <main className="min-h-screen w-full container flex justify-center bg-gradient-to-b from-zinc-50 to-zinc-200">
      <Messages support={true} />
    </main>
  );
};

export default SupportPage;
