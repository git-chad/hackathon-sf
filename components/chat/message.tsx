import Image from "next/image";
import pepeBot from "@/public/pepe-bot.jpg";
import pepeUser from "@/public/pepe-user.jpg";
import React from "react";

type Props = {
  sender: boolean;
  message: string;
  time: string;
};

const Message = ({ sender, message, time }: Props) => {
  const displayTime = time.substring(0, 5) + time.substring(8);

  const formattedMessage = message.split("\n").map((str, index, array) => {
    const parts = str.split(/(\*\*.*?\*\*)/g).map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });

    return (
      <React.Fragment key={index}>
        {parts}
        {index < array.length - 1 && <br />}
      </React.Fragment>
    );
  });

  if (sender === true) {
    return (
      <div className="flex self-end gap-2">
        <div>
          <p className="p-2 text-start bg-zinc-950 text-white max-w-[320px] rounded-l-lg rounded-tr-lg shadow-sm">
            {formattedMessage}
          </p>
          <small className="text-right">{displayTime}</small>
        </div>
        <Image alt="user image" src={pepeUser} className="size-12 rounded-xl" />
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      <Image
        alt="bot image"
        src={pepeBot}
        className="size-12 rounded-xl border border-zinc-200"
      />
      <div className="flex flex-col">
        <p className="p-2 bg-[#F6F6F6] max-w-[360px] w-max rounded-r-lg rounded-bl-lg shadow-sm">
          {formattedMessage}
        </p>
        <small className="self-end mt-1">{displayTime}</small>
      </div>
    </div>
  );
};

export default Message;
