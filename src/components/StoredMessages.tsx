import { useState } from "react";
import Search from "../assets/Search";
import CheckMark from "../assets/CheckMark";
import Bin from "../assets/trash.svg?react";
import Pages from "./Pagination";

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
  // console.log(message.id, isSelected);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="flex flex-col w-full h-32"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-row justify-between bg-[#717158]">
        <div className="flex flex-row items-center gap-10 h-11 p-2">
          <button
            className="flex items-center justify-center size-4.5 rounded-sm border border-white"
            onClick={() => onSelectMessage(message.id)}
          >
            {isSelected && <CheckMark color="#FFFFFF" />}
          </button>
          <span className="font-firamono font-bold text-[16px] truncate">
            {message.title}
          </span>
        </div>
        <span
          className={`flex items-center justify-center h-[44px] w-[44px] ${
            isHovered || isSelected ? "opacity-100" : "opacity-0"
          }`}
        >
          <Bin />
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

function MessageList({
  selectedMessages,
  onSelectMessage,
}: {
  selectedMessages: number[];
  onSelectMessage: (messages: number[]) => void;
}) {
  function handleSelectMessage(id: number) {
    if (selectedMessages.includes(id)) {
      onSelectMessage(selectedMessages.filter((id) => id != id));
    } else {
      onSelectMessage([...selectedMessages, id]);
    }
  }

  // console.log(selectedMessages);
  // console.log(selectedMessages.includes(1));

  const messageList = messages.map((msg) => (
    <Message
      key={msg.id}
      message={msg}
      isSelected={selectedMessages.includes(msg.id)}
      onSelectMessage={(id) => handleSelectMessage(id)}
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
  const allMessagesSelected = selectedMessages.length === messages.length;

  function handleSelectAllMessages() {
    if (selectedMessages.length < 4) {
      setSelectedMessages(messages.map((msg) => msg.id));
    } else {
      setSelectedMessages([]);
    }
  }

  return (
    <>
      <div className="flex flex-col w-[45%] absolute top-10 bottom-20">
        <h2 className="font-firacode font-semibold text-3xl">
          Stored Messages
        </h2>
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
            className="flex items-center justify-center ml-1 size-5 rounded-sm border border-white"
            onClick={handleSelectAllMessages}
          >
            {allMessagesSelected && <CheckMark color="#FFFFFF" />}
          </button>
          <span className="font-firacode font-bold">
            {messages.length} messages
          </span>
        </div>
        <MessageList
          selectedMessages={selectedMessages}
          onSelectMessage={(msg) => setSelectedMessages(msg)}
        />
      </div>
      <Pages
        pageData={{
          pages: [1, 2, 3, 4, 10],
          currentPage: 1,
          onSelectPage: (pgNum) => console.log(pgNum),
        }}
      />
    </>
  );
}
