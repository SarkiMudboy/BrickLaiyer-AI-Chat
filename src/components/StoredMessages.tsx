import { useState } from "react";
import Search from "../assets/Search";
import CheckMark from "../assets/check-mark.svg?react";

const messages = [
  {
    id: 1,
    title: "Neovim Setup for WSL 2 Windows",
    text: "Natural Language Processing (NLP) is a branch of artificial intelligence that focuses on enabling computers to understand and interprete all this code that we have here",
    updated: "1 mins ago",
  },
  {
    id: 2,
    title: "Neovim Setup for WSL 2 Windows",
    text: "Natural Language Processing (NLP) is a branch of artificial intelligence that focuses on enabling computers to understand and interprete all this code that we have here",
    updated: "2 days ago",
  },
  {
    id: 3,
    title: "Neovim Setup for WSL 2 Windows",
    text: "Natural Language Processing (NLP) is a branch of artificial intelligence that focuses on enabling computers to understand and interprete all this code that we have here",
    updated: "4 days ago",
  },
  {
    id: 4,
    title: "Neovim Setup for WSL 2 Windows",
    text: "Natural Language Processing (NLP) is a branch of artificial intelligence that focuses on enabling computers to understand and interprete all this code that we have here",
    updated: "6 days ago",
  },
];

interface PromptMessage {
  id: number;
  title: string;
  text: string;
  updated: string;
}

function Message({
  message,
  isSelected,
  onSelectMessage,
}: {
  message: PromptMessage;
  isSelected: boolean;
  onSelectMessage: (messageId: number) => void;
}) {
  return (
    <div className="flex flex-col w-full h-32">
      <div className="flex flex-row items-center gap-10 h-11 bg-[#717158] p-2">
        <button
          className="size-4.5 rounded-sm border border-white"
          onClick={() => onSelectMessage(message.id)}
        >
          {isSelected && <CheckMark />}
        </button>
        <span className="font-firamono font-bold text-[16px] truncate">
          {message.title}
        </span>
      </div>
      <div className="flex flex-col bg-[#222225] h-38">
        <div className="font-jetbrains p-4 h-13.5 text-[12px] text-wrap truncate text-ellipsis">
          {message.text}
        </div>
        <span className="font-firamono text-[12px] pl-4 py-2 mt-2">
          • {message.updated}
        </span>
      </div>
    </div>
  );
}

function MessageList({ selectedMessages, onSelectMessage }: { selectedMessages: number[]; onSelectMessage: (number[]) => void }) {
  const [selectedMessages, setSelectedMessages] = useState<number[]>([]);

  function handleSelectAllMessages() {
    setSelectedMessages(messages.map((msg) => msg.id));
  }

  function handleSelectMessage(id: number) {
    setSelectedMessages([...selectedMessages, id]);
  }

  const messageList = messages.map((msg) => (
    <Message
      message={msg}
      isSelected={msg.id in selectedMessages}
      onSelectMessage={handleSelectMessage}
    />
  ));
  return (
    <div className="flex flex-col mt-8 gap-6 overflow-y-auto overscroll-contain">
      {messageList}
    </div>
  );
}

export default function StoredMessages() {
  const [selectedMessages, setSelectedMessages] = useState<number[]>([]);

  function handleSelectAllMessages() {
    setSelectedMessages(messages.map((msg) => msg.id));
  }

  return (
    <div className="flex flex-col w-[45%] fixed top-10 bottom-10">
      <h2 className="font-firacode font-semibold text-3xl">Stored Messages</h2>
      <div className="flex w-full h-12 mt-10 rounded-md bg-[#222225] border border-[#66735d]">
        <span className="flex w-12 justify-center items-center">
          <Search color="#717158" />
        </span>
        <input
          type="search"
          placeholder="Search Messages..."
          className="w-full p-1.5 outline-none font-firacode font-semibold text=[#717158]"
        />
      </div>
      <div className="flex mt-10 items-center justify-start gap-2.5">
        <button
          className="flex ml-1 size-5 rounded-sm border border-white"
          // onClick={handleSelectAllMessages}
        ></button>
        <span className="font-firacode font-bold">
          {messages.length} messages
        </span>
      </div>
      <MessageList />
    </div>
  );
}
