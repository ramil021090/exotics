import { useForm } from "react-hook-form";
import type { AddPostData } from "../../../store/feed/actions/utility/types";
import { useNewsFeedStore } from "../../../store/feed/useNewsFeedStore";
import { FaCameraRetro } from "react-icons/fa";
import { MdOutlineInsertPhoto } from "react-icons/md";

const AddPostForm = () => {
  const { register, handleSubmit, reset } = useForm<AddPostData>();

  const addPost = useNewsFeedStore((state) => state.addPost);

  const onSubmit = async (data: AddPostData) => {
    const imageFiles = data.images ? Array.from(data.images) : [];

    const postData = {
      content: data.content,
      images: imageFiles ?? [],
    };

    await addPost(postData);
    reset();
    console.log(data.content, data.images);
    console.log("Data being sent to Supabase:", data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div
        onClick={() => {
          console.log("clicked");
        }}
        className="flex gap-1 items-center px-2 py-4 m-1 rounded-lg shadow-md bg-white dark:bg-slate-800"
      >
        <input
          // type="button"
          className="bg-slate-200 text-center text-black max-w-50 ml-2 border rounded-lg shadow-md inset-shadow-xs "
          placeholder="Flex your exotics"
        />
        <span>
          <FaCameraRetro size={25} />
        </span>
        <span>
          <MdOutlineInsertPhoto size={30} />
        </span>
      </div>
      <input {...register("content")} className="bg-white text-black" />
      <input
        className="p-2 bg-green-400  shadow-sm rounded-sm  font-black"
        type="file"
        accept="image/*"
        multiple
        {...register("images")}
      />
      <button>post</button>
    </form>
  );
};

export default AddPostForm;
