import { FaCameraRetro } from "react-icons/fa";
import { MdOutlineInsertPhoto } from "react-icons/md";

interface PostButtonProps {
  handleToggle: () => void;
}
const PostButton = ({ handleToggle }: PostButtonProps) => {
  return (
    <>
      <div className="flex gap-1 items-center px-2 py-4 m-1 rounded-lg shadow-md bg-white dark:bg-slate-800">
        <input
          className="bg-slate-200 text-center text-black max-w-50 ml-2 border rounded-lg shadow-md inset-shadow-xs "
          placeholder="Share your thoughts..."
          onClick={handleToggle}
        />
        <span onClick={handleToggle}>
          <FaCameraRetro size={25} />
        </span>
        <span onClick={handleToggle}>
          <MdOutlineInsertPhoto size={30} />
        </span>
      </div>
    </>
  );
};

export default PostButton;
