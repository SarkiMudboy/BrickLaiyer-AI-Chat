import BricksIcon from "./assets/bricks.svg?react";
import LargeBrick from "./assets/brickLarge.svg?react";
import Cog from "./assets/cog.svg?react";
import Database from "./assets/database.svg?react";
import Clip from "./assets/clip.svg?react";
import ArrowDown from "./assets/arrow-down.svg?react";
import ArrowUp from "./assets/ArrowUp";
import Pen from "./assets/pen.svg?react";
import Github from "./assets/github.svg?react";
import LinkedIn from "./assets/linkedin.svg?react";
import Twitter from "./assets/twitter.svg?react";
import CheckMark from "./assets/check-mark.svg?react";
import React, { useRef, useState, type JSX } from "react";
import { models, type Model } from "./data/models";
import ArrowRight from "./assets/arrow-right.svg?react";
import UserFile from "./assets/UserFile";

function NavBar() {
  return (
    <nav className="flex items-center h-[86px] justify-between py-8 px-6">
      <Logo />
      <SettingsButton />
    </nav>
  );
}

function Logo() {
  return (
    <span className="inline-flex items-center justify-between space-x-2.5">
      <BricksIcon />
      <span className="font-poppins font-semibold text-[14px]">
        Brick-Laiyer
      </span>
    </span>
  );
}

function SettingsButton() {
  return (
    <span className="flex items-center justify-center size-10 hover:rounded-[5px] hover:bg-[#717158] hover:opacity-45">
      <Cog />
    </span>
  );
}

function Footer() {
  return (
    <footer
      className="flex flex-row items-center h-[10%] px-6
    "
    >
      <SocialLinks />
      <StoreMessagesCheckBox />
    </footer>
  );
}

function Main() {
  return (
    <div className="flex-1">
      <InteractiveChatWindow />
      <Footer />
    </div>
  );
}

function InteractiveChatWindow() {
  return (
    <div className="flex h-[90%] items-center justify-center">
      <PromptArea />
    </div>
  );
}

function StoreMessagesCheckBox() {
  const [storeMessages, setStoreMessages] = useState(false);
  return (
    <div className="fixed inline-flex gap-3.5 left-[45%]">
      <button
        className="flex items-center justify-center size-5 rounded-sm border border-[#08CB00]"
        onClick={() => setStoreMessages(!storeMessages)}
      >
        {storeMessages && <CheckMark />}
      </button>
      <p className="font-firamono text-[14px]">Store Messages</p>
    </div>
  );
}

function SocialLinks() {
  const links = [<Twitter />, <Github />, <LinkedIn />].map(
    (
      link // create a better object with links and all
    ) => (
      <button className="flex items-center justify-center size-12 rounded-[5px] hover:bg-[#30302E]">
        {link}
      </button>
    )
  );

  return (
    <div>
      <ul className="flex items-center justify-center">{links}</ul>
    </div>
  );
}

type PromptConfig = {
  query: string;
  model: string;
  file?: File;
};

function PromptArea() {
  const [promptConfig, setPromptConfig] = useState({
    query: "",
    model: models[0].id,
  });
  const [promptHistory, setPromptHistory] = useState<
    { id: string; text: string }[]
  >([]);

  function handleAddPromptHistory(prompt: { id: string; text: string }) {
    setPromptHistory([...promptHistory, prompt]);
  }

  return (
    <div className="flex flex-col items-center w-[55%]">
      <GreetingText />
      <div className="w-[100%] mt-4">
        <PromptTextBox
          promptOptions={promptConfig}
          onChangeConfig={setPromptConfig}
          addPrompt={handleAddPromptHistory}
        />
        <PromptHistory history={promptHistory} />
      </div>
    </div>
  );
}

function GreetingText() {
  return (
    <div className="inline-flex items-center justify-center space-x-7">
      <span>
        <LargeBrick />
      </span>
      <p className="font-firacode text-3xl font-semibold">
        Good Evening, Sarki
      </p>
    </div>
  );
}

function PromptTextBox({
  promptOptions,
  onChangeConfig,
  addPrompt,
}: {
  promptOptions: PromptConfig;
  onChangeConfig: (config: PromptConfig) => void;
  addPrompt: (prompt: { id: string; text: string }) => void;
}) {
  const [fileSelected, setFileSelected] = useState(false);

  function handleChangePrompt(e: React.ChangeEvent<HTMLTextAreaElement>) {
    onChangeConfig({ ...promptOptions, query: e.target.value });
  }

  return (
    <>
      {fileSelected && (
        <div className="flex items-center justify-start mx-10 my-10 h-32 bg-[#222225] mb-0 rounded-t-[9px] border border-dashed border-[#545e4c]">
          <div className="flex p-10 items-center gap-10">
            <UserFile
              removeFile={() => {
                onChangeConfig({ ...promptOptions });
                setFileSelected(false);
              }}
            />
            <span className="font-firacode text-[#94B280]">
              {promptOptions.file ? promptOptions.file.name : "Error"}
            </span>
          </div>
        </div>
      )}
      <div
        className={`mx-10 ${
          fileSelected
            ? "mt-0 rounded-b-xl border border-t-0"
            : "my-10 rounded-xl border-[0.2px]"
        } bg-[#222225] border-[#3d4437]`}
      >
        <form action="">
          <textarea
            name="promptTextBox"
            placeholder="Whats up..."
            cols={2}
            rows={2}
            style={{ resize: "none" }}
            onChange={(e) => handleChangePrompt(e)}
            className={`w-[100%] h-20 font-firamono font-medium text-[16px] ${
              promptOptions.query ? "text-white" : "text-[#717158]"
            }  px-4 pt-5 outline-none`}
          ></textarea>
          <PromptActions
            promptOptions={promptOptions}
            onChangeConfig={onChangeConfig}
            addPrompt={addPrompt}
            onSelectFile={() => setFileSelected(true)}
          />
        </form>
      </div>
    </>
  );
}

interface ModelCardProps {
  id: string;
  name: string;
  desc: string;
  logo: JSX.Element;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

function ModelCard({
  id,
  name,
  desc,
  logo,
  isSelected,
  onSelect,
}: ModelCardProps) {
  return (
    <div
      className={`flex items-center w-[300px] h-15 mx-3 my-2.5 ${
        isSelected ? "bg-[#1E1D1C]" : ""
      } ${isSelected ? "hover:bg-[#1E1D1C]" : "hover:bg-[#484349]"} rounded-sm`}
      onClick={() => onSelect(id)}
    >
      <div className="flex flex-col w-4/5 m-5 font-normal font-poppins">
        <p className="text-sm font-jetbrains cursor-pointer">{name}</p>
        <p className="text-[9px] font-jetbrains cursor-pointer">{desc}</p>
      </div>
      <span className="flex items-center justify-center w-12 h-12">{logo}</span>
    </div>
  );
}

function SelectModelDropdown({
  options,
  onChangeModel,
}: {
  options: PromptConfig;
  onChangeModel: (config: PromptConfig) => void;
}) {
  const selectedModel = models.find((model) => model.id === options.model);
  const [isOpen, setIsOpen] = useState(false);

  function toggleDropdown(e: React.MouseEvent<HTMLButtonElement>) {
    // console.log("Okay");
    e.preventDefault();
    setIsOpen(!isOpen);
  }

  function handleSelectModel(id: string) {
    onChangeModel({ ...options, model: id });
  }

  const modelList = models.map((model: Model) => {
    return (
      <li key={model.id}>
        <ModelCard
          id={model.id}
          name={model.name}
          desc={model.description}
          logo={model.logo}
          isSelected={selectedModel?.id === model.id}
          onSelect={handleSelectModel}
        />
      </li>
    );
  });
  return (
    <div>
      <button
        className="flex items-center justify-center bg-[#1E1E1E] px-2 h-full min-w-[140px] max-w-[210px] gap-4 border border-[#94B280] rounded-xl hover:border-2 hover:border-[#08CB00]"
        onClick={(e) => toggleDropdown(e)}
      >
        <span className="font-firamono font-medium truncate text-ellipsis">
          {selectedModel?.name}
        </span>
        <span>
          <ArrowDown />
        </span>
      </button>
      {isOpen && (
        <div className="absolute z-10 mt-1 bg-[#30302E] rounded-[7px] max-h-60 overflow-y-auto">
          {" "}
          <ul>{modelList}</ul>
        </div>
      )}
    </div>
  );
}

function PromptActions({
  promptOptions,
  onChangeConfig,
  onSelectFile,
  addPrompt,
}: {
  promptOptions: PromptConfig;
  onChangeConfig: (config: PromptConfig) => void;
  onSelectFile: () => void;
  addPrompt: (prompt: { id: string; text: string }) => void;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const selectFile = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    inputRef.current ? inputRef.current.click() : null;
  };

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onChangeConfig({ ...promptOptions, file: e.target.files[0] });
      onSelectFile();
    }
  };

  return (
    <div className="flex flex-row justify-between mx-3 mb-2.5">
      <div className="flex gap-2.5">
        <SelectModelDropdown
          options={promptOptions}
          onChangeModel={onChangeConfig}
        />
        <input
          type="file"
          ref={inputRef}
          style={{ display: "None" }}
          onChange={handleFileSelected}
        />
        <button
          className="flex items-center justify-center rounded-md size-9 border border-[#94B280] hover:border-2 hover:border-[#08CB00]"
          onClick={(e) => selectFile(e)}
        >
          <Clip />
        </button>
        <button className="flex items-center justify-center gap-3 w-[120px] rounded-[4px] hover:bg-[#2A2A2C]">
          <span>
            <Pen />
          </span>
          <span className="font-firamono">Prompts</span>
        </button>
        <button className="flex items-center justify-center gap-3 w-[120px] rounded-[4px] hover:bg-[#2A2A2C]">
          <span>
            <Database />
          </span>
          <span className="font-firamono">Storage</span>
        </button>
      </div>
      <button
        type="submit"
        disabled={!promptOptions.query}
        onClick={(e) => {
          e.preventDefault();
          addPrompt({ id: crypto.randomUUID(), text: promptOptions.query });
        }}
        className={`flex items-center justify-center size-9 rounded-[4px] border border-[#94B280] disabled:hover:border disabled:hover:border-[#94B280] hover:border-2 hover:border-[#08CB00]`}
      >
        <ArrowUp color={promptOptions.query ? "#FFFFFF" : "#717158"} />
      </button>
    </div>
  );
}

function PromptHistory({
  history,
}: {
  history: { id: string; text: string }[];
}) {
  return history.length > 0 ? (
    <div className="mx-10">
      <h4 className="font-jetbrains text-sm">History</h4>
      <PromptHistoryList prompts={history} />
    </div>
  ) : null;
}

function PromptHistoryList({
  prompts,
}: {
  prompts: { id: string; text: string }[];
}) {
  const history = prompts.map((prompt) => (
    <PromptHistoryItem key={prompt.id} prompt={prompt} />
  ));
  return (
    <div className="mt-8">
      <ul>{history.reverse().slice(0, 4)}</ul>
    </div>
  );
}

function PromptHistoryItem({
  prompt,
}: {
  prompt: { id: string; text: string };
}) {
  return (
    <div className="flex items-center p-3 mt-2.5 w-fit max-w-[300px] h-10 border-[1.6px] border-dotted border-[#698555] rounded-md">
      <p className="font-jetbrains text-sm truncate mr-2.5">{prompt.text}</p>
      <span className="shrink-0">
        <ArrowRight />
      </span>
    </div>
  );
}

function App() {
  return (
    <div className="flex flex-col w-screen h-screen box-border bg-[#161619]">
      <NavBar />
      <Main />
    </div>
  );
}
export default App;
