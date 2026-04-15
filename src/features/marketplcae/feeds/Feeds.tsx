import { useEffect, useRef, useState } from "react";
import { useNewsFeedStore } from "../../../store/feed/useNewsFeedStore";

import { BiSolidLike } from "react-icons/bi";
import { FaRegCommentDots } from "react-icons/fa";
import { FaEllipsisVertical } from "react-icons/fa6";
import { TiArrowDownThick } from "react-icons/ti";
import { ImSpinner9 } from "react-icons/im";
import { RiDeleteBin6Fill } from "react-icons/ri";
// import { MdModeEdit } from "react-icons/md";

import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../../../ui/Spinner";
import Button from "../../../ui/Button";
import SmallModal from "../../../modals/SmallModal";
import { MdModeEdit } from "react-icons/md";

const Feeds = () => {
  const [activeModalPostId, setActiveModalPostId] = useState<number | null>(
    null,
  );

  const fetchFeed = useNewsFeedStore((state) => state.fetchFeed);
  const loadMore = useNewsFeedStore((state) => state.loadMore);
  const deletePost = useNewsFeedStore((state) => state.deletePost);
  const { feeds, loading, loadingMore, hasMore } = useNewsFeedStore();

  const navigate = useNavigate();
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
      <div className="text-center p-4">
        <Spinner size={24} />
      </div>
    );

  const formatDate = (dateString: string | null | undefined): string => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <>
      <div className="flex flex-col shadow-2xl  rounded-t-lg my-2  mx-auto space-4">
        {feeds?.map((post) => (
          <div
            key={post?.id}
            className=" my-2 py-2 shadow-md  rounded-t-lg bg-white dark:bg-slate-800 "
          >
            <div className="shadow-sm">
              <div className="flex justify-end px-2 pt-2 relative">
                {activeModalPostId === post.id && post.user_id === id && (
                  <SmallModal onClose={() => setActiveModalPostId(null)}>
                    <div className="flex flex-col items-start ">
                      <Button
                        icon={<RiDeleteBin6Fill />}
                        variant="success"
                        title="delete"
                        type="button"
                        size="sm"
                        onDelete={async (id) => {
                          await deletePost(id);
                          setActiveModalPostId(null);
                        }}
                        deleteId={post.id}
                      />
                      <Button
                        onToggle={() => {
                          setActiveModalPostId(null);
                        }}
                        icon={<MdModeEdit />}
                        variant="success"
                        title="edit"
                        type="button"
                        size="sm"
                      />
                    </div>
                  </SmallModal>
                )}
                {post.user_id === id && (
                  <button
                    className="flex"
                    onClick={() => setActiveModalPostId(post.id)}
                  >
                    <FaEllipsisVertical />
                  </button>
                )}
              </div>

              <div className=" mb-2 px-2 ">
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
                <div className="text-left ">
                  <p className="text-xs">{formatDate(post?.created_at)}</p>
                  <p className="my-2">{post?.content}</p>
                </div>
              </div>
              {post?.image_urls && post?.image_urls.length > 0 && (
                <div
                  className={`border-b-2 shadow-lg ${post.image_urls.length >= 2 ? "grid grid-cols-2 gap-0.5" : ""}`}
                >
                  {post?.image_urls?.map((url, idx) => (
                    <img
                      key={idx}
                      src={url}
                      alt={`post image ${idx + 1}`}
                      className="object-cover w-full h-auto  border-b-2 shadow-lg "
                    />
                  ))}
                </div>
              )}
            </div>

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
              <div className="text-center text-sm rounded-full bg-slate-400 animate-bounce ">
                <TiArrowDownThick size={18} />
              </div>
            )}
          </div>
        )}

        {!hasMore && feeds.length > 0 && (
          <div className=" flex justify-center items-center text-center text-sm text-gray-500 py-4">
            <div className="animate-spin ">
              <ImSpinner9 size={18} />
            </div>
            <span className="mx-1">Processing...</span>
          </div>
        )}
      </div>
    </>
  );
};

export default Feeds;
