import toast from "react-hot-toast";
import supabase from "../../../supabase/supabaseClients";
import type { AddPostData, FeedStore, } from "./utility/types";
import { uploadImages } from "./utility/uploadImages";


export const addPost = async (
  set: (state: Partial<FeedStore> | ((state: FeedStore) => Partial<FeedStore>)) => void,
  postData: AddPostData
) => {
  try {
    // 1. Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError) throw userError;
    if (!user) throw new Error("You must be logged in to add a post");

    let imageUrls:string[] = [];

    // 2. Upload image if a file is provided
    if (postData.images && postData.images.length > 0) {
      const files = Array.from(postData.images);
      imageUrls = await uploadImages(files);
    }

     const newPost = {
      user_id: user.id,
      content: postData.content,
      image_urls: imageUrls,
      likes_count: 0,
    };

    const { data, error } = await supabase
      .from("posts")
      .insert([newPost])
      .select()
      .single();

    if (error) throw error;

    set((state) => ({
      feeds: [data, ...(state.feeds || [])],
      error: null,
    }));
    toast.success("Post added successfully!");
  
  } catch (error) {
    console.error("Error posting:", error);
    toast.error("Failed to add post. Please try again.");
    throw error;
  }
};