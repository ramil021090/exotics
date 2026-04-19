import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useNewsFeedStore } from "../store/feed/useNewsFeedStore";

import AddAndEditPostForm from "./AddAndEditPostForm";
import Spinner from "../ui/Spinner";
import PostButton from "./PostButton";
import PostTable from "./PostTable";
import InfiniteScrollPagination from "../ui/InfiniteScrollPagination";
import LikesAndComments from "./LikesAndComments";

const Feeds = () => {
  const [activeModalPostId, setActiveModalPostId] = useState<number | null>(
    null,
  );
  const [openModal, setOpenModal] = useState(false);

  const handleToggle = () => {
    setOpenModal((prev) => !prev);
  };

  const fetchFeed = useNewsFeedStore((state) => state.fetchFeed);
  const loadMore = useNewsFeedStore((state) => state.loadMore);
  const { feeds, loading, loadingMore, hasMore } = useNewsFeedStore();

  const observerRef = useRef<HTMLDivElement>(null);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    fetchFeed();
  }, [fetchFeed]);

  useEffect(() => {
    if (!hasMore || loadingMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 0.5, rootMargin: "100px" },
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, loadingMore, loadMore]);

  if (loading && feeds?.length === 0)
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-50">
        <Spinner size={32} />
      </div>
    );
  console.log(feeds);
  return (
    <>
      <PostButton handleToggle={handleToggle} />
      {openModal && (
        <AddAndEditPostForm
          onToggle={handleToggle}
          showForm={openModal}
          setOpenModal={setOpenModal}
        />
      )}

      <div className="flex flex-col shadow-2xl  rounded-t-lg my-2  mx-auto space-4">
        {feeds?.map((post) => (
          <div
            key={post?.id}
            className=" my-2 py-2 shadow-md  rounded-t-lg bg-white dark:bg-slate-800 "
          >
            {id && (
              <PostTable
                id={id}
                post={post}
                activeModalPostId={activeModalPostId}
                setActiveModalPostId={setActiveModalPostId}
              />
            )}

            <LikesAndComments />
          </div>
        ))}

        <InfiniteScrollPagination
          hasMore={hasMore}
          loadingMore={loadingMore}
          observerRef={observerRef}
          feeds={feeds}
        />
      </div>
    </>
  );
};

export default Feeds;
