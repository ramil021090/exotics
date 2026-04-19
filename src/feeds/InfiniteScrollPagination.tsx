import type { RefObject } from "react";
import { ImSpinner9 } from "react-icons/im";
import type { Post } from "../store/feed/actions/utility/types";

interface InfiniteScrollPaginationProps {
  hasMore?: boolean;
  loadingMore?: boolean;
  observerRef?: RefObject<HTMLDivElement | null>;
  feeds?: Post[];
  ref?: (node: HTMLDivElement | null) => (() => void) | undefined;
}

const InfiniteScrollPagination = (props: InfiniteScrollPaginationProps) => {
  const { hasMore, loadingMore, observerRef, feeds, ref } = props;
  return (
    <>
      {hasMore && (
        <div
          ref={observerRef}
          className="h-10 flex justify-center items-center"
        >
          {loadingMore && (
            <div className="text-center text-slate-500 ">
              <p>Loading...</p>
            </div>
          )}
        </div>
      )}
      {feeds && !hasMore && feeds.length > 0 && (
        <div className=" flex justify-center items-center text-center text-sm text-gray-500 py-4">
          <div className="animate-spin ">
            <ImSpinner9 size={18} />
          </div>
          <span className="mx-1 text-slate-500">Processing...</span>
        </div>
      )}
      {ref && (
        <div
          ref={ref}
          className="h-10 flex justify-center items-center text-slate-500"
        >
          {loadingMore ? <p>Loading...</p> : <p>Scroll for more</p>}
        </div>
      )}
    </>
  );
};

export default InfiniteScrollPagination;
