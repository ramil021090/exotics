import { useEffect } from "react";
import { useNewsFeedStore } from "../../store/feed/useNewsFeedStore";
import { useAuthenticationStore } from "../../store/useAuthentication.tsx/useAuthenticationStore";

import { BiSolidLike } from "react-icons/bi";
import { FaRegCommentDots } from "react-icons/fa";

const Feeds = () => {
  const fetchFeed = useNewsFeedStore((state) => state.fetchFeed);

  const { feeds, loading } = useNewsFeedStore();

  console.log("Feeds from store:", feeds);

  useEffect(() => {
    fetchFeed();
  }, [fetchFeed]);

  if (loading) return <div className="text-center p-4">Loading...</div>;

  return (
    <div className="flex flex-col shadow-2xl  mx-auto space-4">
      {feeds?.map((post) => (
        <div
          key={post.id}
          className="my-2 py-2 shadow-2xl  rounded-t-lg bg-white dark:bg-slate-800"
        >
          <div>user ID:{post.user_id}</div>
          <div>Cotent:{post.content}</div>
          {post.image_urls && post.image_urls.length > 0 && (
            <div
              className={
                post.image_urls && post.image_urls.length >= 2
                  ? " grid grid-cols-1 md:grid-cols-2  gap-2 mt-2 shrink "
                  : " "
              }
            >
              {post.image_urls.map((url, idx) => (
                <img
                  key={idx}
                  src={url}
                  alt={`post image ${idx + 1}`}
                  className="object-cover w-full max-h-80 border-b-2 shadow-2xl "
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
    </div>
  );
};

export default Feeds;
