function NavBar() {
  return (
    <div>
      <h2>NavBar</h2>
      <LogoIcon />
      <SettingsButton />
    </div>
  );
}

function LogoIcon() {
  return (
    <div>
      <span></span>
      <span>BrickLaiyer</span>
    </div>
  );
}

function SettingsButton() {
  return (
    <button>
      <span>Settings</span>
    </button>
  );
}

function Main() {
  return (
    <div>
      <InteractiveChatWindow />
      <StoreMessagesCheckBox />
      <SocialLinks />
    </div>
  );
}

function InteractiveChatWindow() {
  return <PromptArea />;
}

function StoreMessagesCheckBox() {
  return <input type="checkbox" name="" id="" />;
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
    <div>
      <GreetingText />
      <PromptTextArea />
      <PromptHistory />
    </div>
  );
}

function GreetingText() {
  return (
    <div>
      <span>Bricks</span>
      <h3>Good Evening, Sarki</h3>
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
    <div className="App">
      <NavBar />
      <Main />
    </div>
  );
}
export default App;
