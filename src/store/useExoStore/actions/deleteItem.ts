import toast from "react-hot-toast";
import supabase from "../../../supabase/supabaseClients";
import type { ExoStoreProps } from "./utility/types";

 export const deleteItem= async (set: (state: Partial<ExoStoreProps> | ((state: ExoStoreProps) => Partial<ExoStoreProps>)) => void,
  id: number) => {
    set({ error: null,loading:true });
    try {
      
      const { error } = await supabase
      .from("species")
      .delete()
      .eq("id", id);
      

      if (error) {
        console.log(error);
        throw new Error("item could not deleted");
      }

      // Remove from local state
      set((state) => ({
        items: state.items.filter((t) => t.id !== id),
        loading:false
      }));
      toast.success("Item deleted successfully!")
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to delete item",
        loading:false
      });
      toast.error("Failed to delete item. Please try again.");

    }
  }