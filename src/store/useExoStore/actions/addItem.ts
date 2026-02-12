import toast from "react-hot-toast";
import supabase from "../../../supabase/supabaseClients";
import type { ExoStoreProps, Items } from "./utility/types";
import { isFile, isFileList, uploadToSupabaseStorage } from "./utility/util";


export const addItem = async (
  set: (state: Partial<ExoStoreProps> | ((state: ExoStoreProps) => Partial<ExoStoreProps>)) => void,
  itemData: Omit<Items, "id" | "created_at">
) => {
  try {
    let imageUrl:string="";
    const images = itemData.images;

    if (typeof images === 'string') {

      imageUrl = images;
    }else if (isFile(itemData.images)) {

      imageUrl = await uploadToSupabaseStorage(itemData.images);
    }else if (isFileList(itemData.images)) {

      if (itemData.images.length > 0) {
        imageUrl = await uploadToSupabaseStorage(itemData.images[0]);
      }
    }else{

        console.warn('Unexpected images type:', typeof itemData.images);
        throw new Error('Invalid image format provided');
    }
    ///////////
    const formattedItemData = {
      category:itemData.category,
      descriptions:itemData.descriptions,
      price:itemData.price,
      images:imageUrl,
      isSold: false,
    };

  console.log('Inserting item with image URL:', imageUrl);

    const { data, error } = await supabase
      .from("species")
      .insert([formattedItemData])
      .select()
      .single();

    if (error) throw error;



    set((state) => ({
      items: [data, ...state.items],
      error: null,
    }));
        toast.success("Item added succesfully!");

    return data;
  } catch (error) {
    console.error("Error adding item:", error);
    toast.error("Failed to add item. Please try again.");
    throw error;

  }
};