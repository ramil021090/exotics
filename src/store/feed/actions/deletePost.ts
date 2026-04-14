import toast from "react-hot-toast";
import supabase from "../../../supabase/supabaseClients"
import type { FeedStore} from "./utility/types";

 export const deletePost =async(set: (state: Partial<FeedStore> | ((state: FeedStore) => Partial<FeedStore>)) => void
  ,id:number)=>{
  try {
    const {error}=await supabase
    .from(`posts`)
    .delete()
    .eq("id",id)
    if(error) throw new Error("Post could not delete")

    set(state=>({
        feeds:state.feeds.filter((t) => t.id !== id)
      }))
    toast.success("Post deleted succesfully")
    console.log("delete post in zustand");
  } catch (error) {
    console.error(error);
    set({
        error: error instanceof Error ? error.message : "Failed to delete post",
        // loading:false
      });
      toast.error("Failed to delete your post. Please try again.");
  }
 }