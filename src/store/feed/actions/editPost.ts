import supabase from "../../../supabase/supabaseClients";
import type { Post, PostProps } from "./utility/types";

export const editPost=async(
set: (state: Partial<PostProps> | ((state: PostProps) => Partial<PostProps>)) => void,
  id: number,
 post: Partial<Omit<Post, "id" | "created_at">>

)=>{
try {
   const { data, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;

      const user = data?.user;
      if (!user) throw new Error("You must be logged in to update an item");

      
      const { data:updatePost,error } = await supabase
      .from("posts")
      .update(post)
      .eq("id", id)
      .eq("user_id",user.id)
      .select()
      .maybeSingle()
      
      if (error) {
        console.error(error);
        throw new Error("Post could not updated");
      }
      if (!updatePost) throw new Error("Post not found or you don't have permission");

      set((state) => ({
          feeds: state.feeds.map((feed) =>
          feed.id === id ? updatePost : feed
      ),
      error: null,
    }));
  
} catch (error) {
    set({
        error: error instanceof Error ? error.message : "Failed to update post",
      });
  console.error(error);
}


}