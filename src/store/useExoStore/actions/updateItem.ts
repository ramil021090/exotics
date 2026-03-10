import toast from "react-hot-toast";
import supabase from "../../../supabase/supabaseClients";
import type { ExoStoreProps, Items } from "./utility/types";

 export const updateItem= async (set: (state: Partial<ExoStoreProps> | ((state: ExoStoreProps) => Partial<ExoStoreProps>)) => void,
  id: number,
 updatedData: Partial<Omit<Items, "id" | "created_at">>
) => {
    try {
      const { data, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;

      const user = data?.user;
      if (!user) throw new Error("You must be logged in to update an item");

      
      const { data:updatedItem,error } = await supabase
      .from("species")
      .update(updatedData)
      .eq("id", id)
      .eq("user_id",user.id)
      .select()
      .maybeSingle()
      
      if (error) {
        console.error(error);
        throw new Error("item could not updated");
      }
      if (!updatedItem) throw new Error("Item not found or you don't have permission");

      set((state) => ({
          items: state.items.map((item) =>
          item.id === id ? updatedItem : item
      ),
      error: null,
    }));

        toast.success("Item updated succesfully!");
      
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to update item",
      });
      toast.error("Failed to update item. Please try again.");

    }
  }