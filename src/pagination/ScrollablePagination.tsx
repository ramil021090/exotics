import { useSearchParams } from "react-router-dom";
import { useRef, useEffect } from "react";

interface PaginationProps {
  count: number;
  pageSize: number;
}

const ScrollablePagination = ({ count, pageSize }: PaginationProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const currentPage = Number(searchParams.get("page")) || 1;
  const pageCount = Math.ceil(count / pageSize);
  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= pageCount) {
      searchParams.set("page", page.toString());
      setSearchParams(searchParams);
    }
  };

  // Wheel scrolling
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      if (e.deltaY > 0 && currentPage < pageCount) {
        goToPage(currentPage + 1);
      } else if (e.deltaY < 0 && currentPage > 1) {
        goToPage(currentPage - 1);
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, [currentPage, pageCount]);

  // Auto-scroll to current page
  useEffect(() => {
    if (scrollContainerRef.current) {
      const elements = scrollContainerRef.current.children;
      if (elements[currentPage - 1]) {
        elements[currentPage - 1].scrollIntoView({
          behavior: "smooth",
          inline: "center",
          block: "nearest",
        });
      }
    }
  }, [currentPage]);

  if (pageCount <= 1) return null;

  return (
    <div className="my-8">
      {/* Page info */}
      <div className="text-center mb-4">
        <span className="text-2xl font-bold text-amber-600">{currentPage}</span>
        <span className="text-gray-400 mx-2">/</span>
        <span className="text-xl text-gray-500">{pageCount}</span>
        <p className="text-sm text-gray-400 mt-1">
          {count} total results • Scroll to navigate
        </p>
      </div>

      {/* Visual page indicators */}
      <div className="relative max-w-2xl mx-auto">
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-linear-to-r from-white to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-linear-to-l from-white to-transparent z-10"></div>

        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto py-4 px-12 space-x-2 scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {pages.map((page) => (
            <div
              key={page}
              className={`
                shrink-0 w-12 h-12 rounded-full flex items-center justify-center
                transition-all duration-300
                ${
                  currentPage === page
                    ? "bg-amber-500 text-white scale-110 shadow-lg"
                    : "bg-gray-100 text-gray-400"
                }
              `}
            >
              {page}
            </div>
          ))}
        </div>
      </div>

      {/* Mouse scroll hint */}
      <div className="flex justify-center mt-6 text-gray-300">
        <svg
          className="w-5 h-5 animate-pulse"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeWidth={2}
            d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
          />
        </svg>
      </div>
    </div>
  );
};

export default ScrollablePagination;
