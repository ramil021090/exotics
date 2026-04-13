import { useForm } from "react-hook-form";
import type { AddPostData } from "../../../store/feed/actions/utility/types";
import { useNewsFeedStore } from "../../../store/feed/useNewsFeedStore";
import { FaCameraRetro } from "react-icons/fa";
import { MdOutlineInsertPhoto } from "react-icons/md";
import { useState } from "react";
import Modal from "../../../modals/Modal";
import Button from "../../../ui/Button";
import TextAreaFrom from "../../../forms/TextAreaForm";
import ImageFileForm from "../../../forms/ImageFileForm";

const AddPostForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddPostData>();

  const addPost = useNewsFeedStore((state) => state.addPost);
  const [openModal, setOpenModal] = useState(false);

  const handleToggle = () => {
    setOpenModal((prev) => !prev);
  };

  const onSubmit = async (data: AddPostData) => {
    const imageFiles = data.images ? Array.from(data.images) : [];

    const postData = {
      content: data.content,
      images: imageFiles ?? [],
    };

    await addPost(postData);
    reset();
    setOpenModal(false);
  };

  return (
    <>
      <div
        onClick={handleToggle}
        className="flex gap-1 items-center px-2 py-4 m-1 rounded-lg shadow-md bg-white dark:bg-slate-800"
      >
        <input
          className="bg-slate-200 text-center text-black max-w-50 ml-2 border rounded-lg shadow-md inset-shadow-xs "
          placeholder="Share your thoughts..."
        />
        <span>
          <FaCameraRetro size={25} />
        </span>
        <span>
          <MdOutlineInsertPhoto size={30} />
        </span>
      </div>

      {openModal && (
        <Modal>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-2"
          >
            <TextAreaFrom
              {...register("content", { required: "field is required!" })}
              className=" bg-green-100 text-black shadow-md h-60 w-auto"
              placeholder="content"
              errors={errors?.content?.message}
            />
            <ImageFileForm
              className="p-2 bg-slate-300 max-w-3xs shadow-md rounded-sm  font-black"
              type="file"
              accept="image/*"
              multiple
              {...register("images")}
            />
            <div className="flex justify-between my-4">
              <Button
                type="reset"
                variant="danger"
                title="Cancel"
                onToggle={handleToggle}
              />
              <Button type="submit" variant="secondary" title="Post" />
            </div>
          </form>
        </Modal>
      )}
    </>
  );
};

export default AddPostForm;
