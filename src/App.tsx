import BricksIcon from "./assets/bricks.svg?react";
import LargeBrick from "./assets/brickLarge.svg?react";
import Cog from "./assets/cog.svg?react";

function NavBar() {
  return (
    <nav className="flex items-center justify-between py-5 px-6">
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
    <span>
      <Cog />
    </span>
  );
}

function Main() {
  return (
    <div className="w-full h-full">
      <InteractiveChatWindow />
      <StoreMessagesCheckBox />
      <SocialLinks />
    </div>
  );
}

function InteractiveChatWindow() {
  return (
    <div className="flex items-center justify-center h-4/5">
      <PromptArea />
    </div>
  );
}

function StoreMessagesCheckBox() {
  return (
    <>
      <input type="checkbox" name="" id="" />
      <p>Store Messages</p>
    </>
  );
}

function SocialLinks() {
  return (
    <div>
      <button>GitHub</button>
      <button>Twitter</button>
      <button>LinkedIn</button>
    </div>
  );
}

function PromptArea() {
  return (
    <div className="">
      <GreetingText />
      <PromptTextArea />
      <PromptHistory />
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

function PromptTextArea() {
  return (
    <div>
      <form action="">
        <textarea name="" id="" cols={10} rows={10}>
          Whats up!...
        </textarea>
        <PromptActions />
        <button type="submit"></button>
      </form>
    </div>
  );
}

function PromptActions() {
  return (
    <div>
      <select name="" id=""></select>
      <input type="file" name="" id="" />
      <button>Prompts</button>
      <button>Storage</button>
    </div>
  );
}

function PromptHistory() {
  return (
    <div>
      <h4>History</h4>
      <PromptHistoryList prompts={[]} />
    </div>
  );
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
    <div>
      <ul>{history}</ul>
    </div>
  );
}

function PromptHistoryItem({
  prompt,
}: {
  prompt: { id: string; text: string };
}) {
  return (
    <div>
      <p>{prompt.text}</p>
    </div>
  );
}

function App() {
  return (
    <div className="w-screen h-screen bg-[#161619]">
      <NavBar />
      <Main />
    </div>
  );
}
export default App;
