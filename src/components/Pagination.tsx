import ArrowRight from "../assets/arrow-right.svg?react";
import ArrowLeft from "../assets/arrow-left.svg?react";

export function getPageNumberArray(start: number, length: number): number[] {
  // start = direction === "left" ? start - 1 : start + 1; this will be done by the event handler on the buttons and passed here
  // tie the start to a state var so clicking the arrow btns triggers a rerender
  if (start + 2 < length && start > 1) {
    return Array.from({ length: 3 }, (_, i) => start + i);
  }
  return [];
}

export function paginate<T>(data: T[], pageSize: number, pageNum: number): T[] {
  const numOfPages =
    Math.floor(data.length / pageSize) + (data.length % pageSize);

  if (!pageNum || pageNum > numOfPages) {
    throw new Error("Page out of range");
  }
  const start = (pageNum - 1) * pageSize;
  const stop = start + pageSize;

  return data.slice(start, stop);
}

function PageButton({
  pageNumber,
  selected,
  onSelect,
}: {
  pageNumber: number | "...";
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      className={`flex items-center justify-center size-6 rounded-sm ${
        selected ? "bg-[#94B280]" : "hover:bg-[#2A2A2C]"
      }`}
      onClick={() => onSelect}
    >
      <span className="font-firacode text-sm text-white">{pageNumber}</span>
    </button>
  );
}

function NavBtn({
  nextPage,
  children,
}: {
  nextPage: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      className="flex items-center justify-center size-6 rounded-sm hover:bg-[#2A2A2C]"
      onClick={() => nextPage()}
    >
      {children}
    </button>
  );
}

interface PageProps {
  pages: number[];
  currentPage: number;
  onSelectPage: (pageNumber: number) => void;
}

// array [ 1, 2, 3, "...", 4]

export function Page({ pageData }: { pageData: PageProps }) {
  const pages = pageData.pages.map((page) => (
    <PageButton
      key={page}
      pageNumber={page}
      selected={page === pageData.currentPage}
      onSelect={() => pageData.onSelectPage(page)}
    />
  ));

  return (
    <div className="flex flex-row absolute bottom-5 gap-1.5">
      <NavBtn nextPage={() => console.log("previous page")}>
        <span>
          <ArrowLeft />
        </span>
      </NavBtn>
      {pages}
      <NavBtn nextPage={() => console.log("next page")}>
        <span>
          <ArrowRight />
        </span>
      </NavBtn>
    </div>
  );
}
