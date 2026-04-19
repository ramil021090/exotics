import { BiSolidLike } from "react-icons/bi";
import { FaRegCommentDots } from "react-icons/fa";

const LikesAndComments = () => {
  return (
    <div className="my-2 flex justify-around">
      <div className="flex items-center gap-1">
        <BiSolidLike /> <span>Like</span>
      </div>
      <div className="flex items-center gap-1">
        <FaRegCommentDots /> <span>Comment</span>
      </div>
    </div>
  );
};

export default LikesAndComments;
