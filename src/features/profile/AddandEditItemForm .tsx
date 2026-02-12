import { useForm } from "react-hook-form";
import { useState, type Dispatch, type SetStateAction } from "react";

import { categoryList } from "./categoryList";
import TextAreaFrom from "../../forms/TextAreaForm";
import InputForm from "../../forms/InputForm";
import SelectForm from "../../forms/SelectForm";

import TextModal from "../../modals/TextModal";

import { useExoStore } from "../../store/useExoStore/useExoStore";
import type { Items } from "../../store/useExoStore/actions/utility/types";

import Button from "../../ui/Button";
import Title from "../../ui/Title";
import Modal from "../../modals/Modal";
interface AddItemProps {
  onToggle: () => void;
  setOpen: Dispatch<SetStateAction<boolean>>;
  // open?: boolean;
  showForm?: boolean;
  displayTableToEdit?: Items | Items[];
}

interface InputForm {
  descriptions: string;
  price: number;
  category: string;
  images: string;
  isSold: boolean;
}

const AddandEditItemForm: React.FC<AddItemProps> = (props) => {
  const { onToggle, setOpen, showForm, displayTableToEdit: data } = props;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const addItem = useExoStore((state) => state.addItem);
  const updateItem = useExoStore((state) => state.updateItem);

  let id: number | undefined = undefined;
  let editValues: Partial<Items> = {};

  if (data && typeof data === "object" && "id" in data) {
    const { id: itemId, ...rest } = data as Items;
    id = itemId;
    editValues = rest;
  }

  const isEditSession = Boolean(id);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<InputForm>({
    defaultValues: isEditSession ? editValues : {},
  });

  const items = { ...editValues };

  const onSubmit = async (formData: InputForm) => {
    try {
      setIsSubmitting(true);

      const itemToInsert = {
        category: formData.category,
        descriptions: formData.descriptions,
        price: formData.price || 0,
        images: formData.images,
        isSold: false,
      };

      if (isEditSession && id) {
        await updateItem(id, itemToInsert);
      } else {
        await addItem(itemToInsert);
      }
      reset();
      setOpen(false);
    } catch (error) {
      console.error("error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          {isSubmitting && (
            <Modal>
              <TextModal
                text={isEditSession ? "Updating Items..." : "Adding Items.."}
              />
            </Modal>
          )}
          <Title text={isEditSession ? "Update Item" : "Add Item"} />
          <SelectForm
            data={categoryList}
            label="category"
            {...register("category")}
          />

          <TextAreaFrom
            label="descriptions"
            {...register("descriptions", { required: "required" })}
            errors={errors?.descriptions?.message}
          />

          <InputForm
            label="amount"
            {...register("price")}
            placeholder="...(optional)"
          />
          {isEditSession ? (
            <img
              src={items?.images}
              alt="currentImage"
              className="max-w-32 max-h-32 object-cover rounded-lg border"
            />
          ) : (
            <InputForm
              type="file"
              placeholder=""
              label="photo"
              accept="image/*"
              {...register("images", {
                required: isEditSession ? false : "required",
              })}
              errors={errors?.images?.message}
            />
          )}
        </div>
        <div className="flex justify-between">
          <Button
            onToggle={onToggle}
            variant="danger"
            title={showForm ? "close" : "cancel"}
            type="reset"
          />
          <Button
            type="submit"
            title={showForm ? "update" : "add"}
            variant="primary"
            disabled={isSubmitting}
          />
        </div>
      </form>
    </>
  );
};

export default AddandEditItemForm;
