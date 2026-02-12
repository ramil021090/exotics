import toast from "react-hot-toast";
import supabase from "../../../supabase/supabaseClients";
import type { ExoStoreProps, Items } from "./utility/types";

 export const updateItem= async (set: (state: Partial<ExoStoreProps> | ((state: ExoStoreProps) => Partial<ExoStoreProps>)) => void,
  id: number,
 updatedData: Partial<Omit<Items, "id" | "created_at">>
) => {
    try {
      const { error } = await supabase
      .from("species")
      .update(updatedData)
      .eq("id", id);
      
      if (error) {
        console.log(error);
        throw new Error("item could not updated");
      }

        toast.success("Item updated succesfully!");
      
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to update item",
      });
      toast.error("Failed to update item. Please try again.");

    }
  }