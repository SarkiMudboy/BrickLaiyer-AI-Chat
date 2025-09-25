import ArrowRight from "../assets/arrow-right.svg?react";
import ArrowLeft from "../assets/arrow-left.svg?react";

class Pages {
  private data: any[];
  private pageSize: number;
  public currentPage: number;

  constructor(data: any[], pageSize = 10) {
    this.data = data;
    this.currentPage = 1;
    this.pageSize = pageSize;
  }

  getPageLength() {
    return this.data.length / this.pageSize;
  }

  getPage(page: number) {
    page = page ? page : this.currentPage + 1;

    if (0 > page || page > this.data.length / this.pageSize) {
      throw new Error("Page out of range");
    }
    const start = (page - 1) * this.pageSize;
    const stop = start + this.pageSize;

    return this.data.slice(start, stop);
  }
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

export default function Page({ pageData }: { pageData: PageProps }) {
  let columnLength = pageData.pages.length + 2;

  const pages = pageData.pages.map((page) => (
    <PageButton
      key={page}
      pageNumber={page}
      selected={page === pageData.currentPage}
      onSelect={() => pageData.onSelectPage(page)}
    />
  ));

  // if (pageData.pageLength <= 5) {
  //   columnLength = pageData.pageLength + 2;

  //   const entries = [...Array(pageData.pageLength + 1).keys()];
  //   pages = entries.map((page) => (
  //     <PageButton
  //       key={page}
  //       pageNumber={page}
  //       selected={page === pageData.currentPage}
  //       onSelect={() => pageData.onSelectPage(page)}
  //     />
  //   ));
  // }

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
