import { useForm } from "react-hook-form";
import type { Post } from "../store/feed/actions/utility/types";
import { useNewsFeedStore } from "../store/feed/useNewsFeedStore";
import { RiCloseCircleFill } from "react-icons/ri";
import { uploadImages } from "../store/feed/actions/utility/uploadImages";

import {
  useEffect,
  useMemo,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import Modal from "../modals/Modal";
import Button from "../ui/Button";
import TextAreaFrom from "../forms/TextAreaForm";
import ImageFileForm from "../forms/ImageFileForm";
import Subheader from "../ui/Subheader";

interface AddAndEditPostFormProps {
  showForm: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  onToggle: () => void;
  currentPost?: Post | Post[];
}

export type InputAddandEditForm = {
  content?: string;
  images?: File[] | null;
};

const AddAndEditPostForm = (props: AddAndEditPostFormProps) => {
  const { onToggle, showForm, setOpenModal, currentPost: data } = props;

  const { id, editValues } = useMemo<{
    id?: number;
    editValues: Partial<Post>;
  }>(() => {
    if (data && typeof data === "object" && "id" in data) {
      const { id: postId, ...rest } = data as Post;
      return { id: postId, editValues: rest };
    }
    return { id: undefined, editValues: {} };
  }, [data]);

  const isEditSession = Boolean(id);

  const [existingImageUrls, setExistingImageUrls] = useState<string[]>(() =>
    isEditSession && editValues.image_urls ? editValues.image_urls : [],
  );
  const [newImageFiles, setNewImageFiles] = useState<File[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<InputAddandEditForm>({
    defaultValues: isEditSession ? editValues : {},
  });
  const imageUrls = editValues.image_urls;

  useEffect(() => {
    if (isEditSession && imageUrls) {
      setExistingImageUrls(imageUrls);
    } else {
      setExistingImageUrls([]);
    }
    setNewImageFiles([]);
  }, [id, isEditSession, imageUrls]);
  const addPost = useNewsFeedStore((state) => state.addPost);
  const editPost = useNewsFeedStore((state) => state.editPost);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setNewImageFiles(files);
  };

  const removeExistingImage = (urlToRemove: string) => {
    console.log("Removing:", urlToRemove);
    console.log("Current URLs:", existingImageUrls);
    setExistingImageUrls((prev) => {
      const filtered = prev.filter((url) => url !== urlToRemove);
      console.log("Filtered URLs:", filtered);
      return filtered;
    });
  };

  const onSubmit = async (data: InputAddandEditForm) => {
    try {
      let allImageUrls: string[] = [];

      if (isEditSession) {
        allImageUrls = [...existingImageUrls];
      }

      if (newImageFiles.length > 0) {
        const uploadedUrls = await uploadImages(newImageFiles);
        allImageUrls = [...allImageUrls, ...uploadedUrls];
      }

      const postData = {
        content: data.content,
        image_urls: allImageUrls,
      };

      if (isEditSession && id) {
        await editPost(id, postData);
      } else {
        await addPost(postData);
      }
      reset();
      setOpenModal(false);
      setExistingImageUrls([]);
      setNewImageFiles([]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {showForm && (
        <Modal>
          <Subheader
            title={isEditSession ? "Update your post" : "Share your thoughts"}
          />
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

            {isEditSession && existingImageUrls.length > 0 && (
              <div className="text-slate-500">
                {existingImageUrls.length > 1 ? (
                  <label>Current Images</label>
                ) : (
                  <label>Current Image</label>
                )}
                <div
                  className={`flex gap-2 ${existingImageUrls.length > 2 ? "grid grid-cols-2" : ""} `}
                >
                  {existingImageUrls.map((url, idx) => (
                    <div key={idx} className={`relative `}>
                      <button
                        type="button"
                        onClick={() => removeExistingImage(url)}
                        className="absolute top-0 right-0  text-red-500"
                      >
                        <RiCloseCircleFill />
                      </button>
                      <img
                        src={url}
                        alt={`Existing ${idx}`}
                        className={`w-20 h-20 object-cover`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <ImageFileForm
              className="p-2 bg-slate-300 max-w-3xs shadow-md rounded-sm  font-black"
              type="file"
              accept="image/*"
              multiple
              onChange={onFileChange}
            />
            {newImageFiles.length > 0 && (
              <div>
                <label>New Images to add:</label>
                <div className="flex gap-2">
                  {newImageFiles.map((file, idx) => (
                    <img
                      key={idx}
                      src={URL.createObjectURL(file)}
                      alt={`New ${idx}`}
                      className="w-20 h-20 object-cover"
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-between my-4">
              <Button
                type="reset"
                variant="danger"
                title="Cancel"
                onToggle={onToggle}
              />
              <Button
                type="submit"
                variant="secondary"
                title={isEditSession ? "Update" : "Post"}
              />
            </div>
          </form>
        </Modal>
      )}
    </>
  );
};

export default AddAndEditPostForm;
