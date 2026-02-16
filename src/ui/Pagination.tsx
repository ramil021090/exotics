import { useSearchParams } from "react-router-dom";

interface PaginationProps {
  count: number;
}

const PAGE_SIZE = 5;
const Pagination = ({ count }: PaginationProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const pageCount = Math.ceil(count / PAGE_SIZE);

  const nextPage = () => {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;
    searchParams.set("page", next.toString());
    setSearchParams(searchParams);
  };
  const prevtPage = () => {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;
    searchParams.set("page", prev.toString());
    setSearchParams(searchParams);
  };

  if (pageCount <= 1) return null;

  return (
    <div className=" my-5 flex justify-between">
      <p>
        Showing{" "}
        <span className="px-2">{(currentPage - 1) * PAGE_SIZE + 1}</span>
        to <span className="px-2">{currentPage * PAGE_SIZE}</span>of{" "}
        <span className="bg-amber-400">{count}</span>
        results
      </p>
      <div className="flex ">
        <button
          onClick={prevtPage}
          className="mx-2 hover:bg-amber-500"
          disabled={currentPage === 1}
        >
          &lt; Previous{" "}
        </button>
        <button
          onClick={nextPage}
          disabled={currentPage === pageCount}
          className="mx-2  hover:bg-amber-500 "
        >
          Next &gt;
        </button>
      </div>
    </div>
  );
};

export default Pagination;
