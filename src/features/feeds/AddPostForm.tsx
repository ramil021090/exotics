import { useForm } from "react-hook-form";
import type { AddPostData } from "../../store/feed/actions/utility/types";
import { useNewsFeedStore } from "../../store/feed/useNewsFeedStore";

const AddPostForm = () => {
  const { register, handleSubmit, reset } = useForm<AddPostData>();

  const addPost = useNewsFeedStore((state) => state.addPost);

  const onSubmit = async (data: AddPostData) => {
    await addPost({
      content: data.content,
      images: data.images,
    });
    reset();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>post your thoughts</label>
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
