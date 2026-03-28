import { useEffect, useRef } from "react";
import { useNewsFeedStore } from "../../store/feed/useNewsFeedStore";

import { BiSolidLike } from "react-icons/bi";
import { FaRegCommentDots } from "react-icons/fa";
import { FaEllipsisVertical } from "react-icons/fa6";

import { useNavigate } from "react-router-dom";

const Feeds = () => {
  const fetchFeed = useNewsFeedStore((state) => state.fetchFeed);
  const loadMore = useNewsFeedStore((state) => state.loadMore);

  const { feeds, loading, loadingMore, hasMore } = useNewsFeedStore();

  const navigate = useNavigate();
  const observerRef = useRef<HTMLDivElement>(null);

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
      { threshold: 0.5, rootMargin: "100px" }, // triggers a bit earlier
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, loadingMore, loadMore]);

  if (loading && feeds?.length === 0)
    return <div className="text-center p-4">Loading...</div>;

  return (
    <div className="flex flex-col shadow-2xl  rounded-t-lg my-2  mx-auto space-4">
      {feeds?.map((post) => (
        <div
          key={post?.id}
          className="my-2 py-2 shadow-md  rounded-t-lg bg-white dark:bg-slate-800 "
        >
          <div className="flex justify-end px-2 pt-2 relative">
            <button className="flex">
              <FaEllipsisVertical />
            </button>
          </div>
          <div className="mb-2 px-2">
            <div
              className="flex gap-1"
              onClick={() => navigate(`/profile/${post.profiles.id}`)}
            >
              <img
                className="w-6 h-6  rounded-full object-cover "
                src={
                  post.profiles?.avatar_url ||
                  "../../images/default-avatar.png "
                }
                alt={`avatar of ${post.profiles?.id || "user"} `}
              />
              <p>{post.profiles?.username || post.profiles?.first_name}</p>
            </div>
            <div>{post?.created_at}</div>
            <p className="my-2">Cotent:{post?.content}</p>
          </div>
          {post?.image_urls && post?.image_urls.length > 0 && (
            <div
              className={
                post?.image_urls && post?.image_urls.length >= 2
                  ? " grid grid-cols-1 md:grid-cols-2  gap-2 mt-2 shrink "
                  : " "
              }
            >
              {post?.image_urls?.map((url, idx) => (
                <img
                  key={idx}
                  src={url}
                  alt={`post image ${idx + 1}`}
                  className="object-cover w-auto h-full border-b-2 shadow-lg "
                />
              ))}
            </div>
          )}
          <div className="my-2 flex justify-around">
            <div className="flex items-center gap-1">
              <BiSolidLike /> <span>Like</span>
            </div>
            <div className="flex items-center gap-1">
              <FaRegCommentDots /> <span>Comment</span>
            </div>
          </div>
        </div>
      ))}

      {hasMore && (
        <div
          ref={observerRef}
          className="h-10 flex justify-center items-center"
        >
          {loadingMore && (
            <div className="text-center text-sm text-gray-500">
              Loading more posts...
            </div>
          )}
        </div>
      )}

      {!hasMore && feeds.length > 0 && (
        <div className="text-center text-sm text-gray-500 py-4">
          No more posts to load
        </div>
      )}
    </div>
  );
};

export default Feeds;
