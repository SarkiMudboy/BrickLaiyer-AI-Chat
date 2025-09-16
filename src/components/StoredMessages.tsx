import Search from "../assets/Search";

function MessageList() {
  return <div></div>;
}

export default function StoredMessages() {
  return (
    <div className="flex flex-col w-[40%] h-full">
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
        <button className="size-5 rounded-sm border border-white"></button>
        <span className="font-firacode font-bold">20 messages</span>
      </div>
      <MessageList />
    </div>
  );
}
