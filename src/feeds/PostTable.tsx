import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaEllipsisVertical } from "react-icons/fa6";
import { MdModeEdit } from "react-icons/md";

import { useNavigate } from "react-router-dom";
import { useState, type Dispatch, type SetStateAction } from "react";

import { useNewsFeedStore } from "../store/feed/useNewsFeedStore";
import type { Post } from "../store/feed/actions/utility/types";
import SmallModal from "../modals/SmallModal";
import AddAndEditPostForm from "./AddAndEditPostForm";
import Button from "../ui/Button";

interface PostTableProps {
  id: string;
  post: Post;
  activeModalPostId: number | null;
  setActiveModalPostId: Dispatch<SetStateAction<number | null>>;
}

const PostTable = (props: PostTableProps) => {
  const { id, post: data, activeModalPostId, setActiveModalPostId } = props;

  const navigate = useNavigate();

  const [showForm, setShowForm] = useState(false);
  const deletePost = useNewsFeedStore((state) => state.deletePost);

  const handleToggle = () => {
    setShowForm((prev) => !prev);
  };

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
      <div className="shadow-sm">
        <div className="flex justify-end px-2 pt-2 relative">
          {activeModalPostId === data.id && data.user_id === id && (
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
                  deleteId={data.id}
                />
                <Button
                  onToggle={() => {
                    handleToggle();
                    setActiveModalPostId(null);
                    console.log("clicked");
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
          {data.user_id === id && (
            <button
              className="flex"
              onClick={() => setActiveModalPostId(data.id)}
            >
              <FaEllipsisVertical />
            </button>
          )}
        </div>

        <div className=" mb-2 px-2 ">
          <div
            className="flex gap-1"
            onClick={() => navigate(`/profile/${data.profiles.id}`)}
          >
            <img
              className="w-6 h-6  rounded-full object-cover "
              src={
                data.profiles?.avatar_url || "../../images/default-avatar.png "
              }
              alt={`avatar of ${data.profiles?.id || "user"} `}
            />
            <p>{data.profiles?.username || data.profiles?.first_name}</p>
          </div>
          <div className="text-left ">
            <p className="text-xs">{formatDate(data?.created_at)}</p>
            <p className="my-2">{data?.content}</p>
          </div>
        </div>
        {data?.image_urls && data?.image_urls.length > 0 && (
          <div
            className={`border-b-2 shadow-lg ${data.image_urls.length >= 2 ? "grid grid-cols-2 gap-0.5" : ""}`}
          >
            {data?.image_urls?.map((url, idx) => (
              <img
                key={idx}
                src={url}
                alt={`post image ${idx + 1}`}
                className="object-cover w-full h-auto  border-b-2 shadow-lg "
              />
            ))}
          </div>
        )}
        {showForm && (
          <div key={data.id}>
            <AddAndEditPostForm
              onToggle={handleToggle}
              showForm={showForm}
              setOpenModal={setShowForm}
              currentPost={data}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default PostTable;
