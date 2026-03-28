import { useSearchParams } from "react-router-dom";
import { useBookingsStore } from "../store/useBookingsStore/useBookingsStore";

interface PaginationProps {
  count: number;
  pagSize: number;
}

const Pagination = ({ count, pagSize }: PaginationProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const prefetchBookingsPage = useBookingsStore(
    (state) => state.prefetchBookingsPage,
  );

  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const pageCount = Math.ceil(count / pagSize);

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

  const handleHoverNext = () => {
    if (currentPage < pageCount) {
      prefetchBookingsPage(currentPage + 1);
    }
  };

  const handleHoverPrev = () => {
    if (currentPage > 1) {
      prefetchBookingsPage(currentPage - 1);
    }
  };

  if (pageCount <= 1) return null;

  return (
    <div className=" my-1 p-2 flex justify-between bg-slate-200 rounded-md shadow-lg">
      <p>
        Showing <span className="px-2">{(currentPage - 1) * pagSize + 1}</span>
        to{" "}
        <span className="px-2">
          {currentPage === pageCount ? count : currentPage * pagSize}
        </span>
        of <span className="px-2">{count}</span>
        results
      </p>
      <div className="flex ">
        <button
          onMouseEnter={handleHoverPrev}
          onClick={prevtPage}
          className="mx-2 hover:bg-amber-500"
          disabled={currentPage === 1}
        >
          &lt; Previous{" "}
        </button>
        <button
          onMouseEnter={handleHoverNext}
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
