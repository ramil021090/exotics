import { useEffect } from "react";
import { useNewsFeedStore } from "../../store/feed/useNewsFeedStore";

import { BiSolidLike } from "react-icons/bi";
import { FaRegCommentDots } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Feeds = () => {
  const fetchFeed = useNewsFeedStore((state) => state.fetchFeed);
  const navigate = useNavigate();

  const { feeds, loading } = useNewsFeedStore();

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
          <div
            className="flex gap-1"
            onClick={() => navigate(`/profile/${post.profiles.id}`)}
          >
            <img
              className="w-6 h-6  rounded-full object-cover "
              src={
                post.profiles?.avatar_url || "../../images/default-avatar.png "
              }
              alt={`avatar of ${post.profiles.id || "user"} `}
            />
            <div>{post.profiles.username || post.profiles.first_name}</div>
          </div>
          <div>{post.created_at}</div>
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
