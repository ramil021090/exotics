import toast from "react-hot-toast";
import supabase from "../../../supabase/supabaseClients";
import type { AddPostData, FeedStore, } from "./utility/types";


export const addPost = async (
  set: (state: Partial<FeedStore> | ((state: FeedStore) => Partial<FeedStore>)) => void,
  postData: AddPostData
) => {
  try {
    // 1. Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError) throw userError;
    if (!user) throw new Error("You must be logged in to add a post");

    const imageUrls:string[] = [];

    // 2. Upload image if a file is provided
    if (postData.images && postData.images.length > 0) {
      const files = Array.from(postData.images);

    for (const file of files) {
      if (!file.type.startsWith('image/')) {
          throw new Error(`Invalid file type: ${file.name}. Only images are allowed.`);
      }

      // Generate a unique filename
        const fileExt = file.name.split('.').pop();
        const fileName = `${crypto.randomUUID()}.${fileExt}`;

      // Upload to 'feeds' bucket
      const { error: uploadError } = await supabase.storage
        .from('feeds')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: true,
        });
      if (uploadError) throw uploadError;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('feeds')
        .getPublicUrl(fileName);
      imageUrls.push(urlData.publicUrl);
      

      
    }

    
    // 3. Prepare post data for insertion
    const newPost = {
      user_id: user.id,
      content: postData.content,
      image_urls: imageUrls,      
      likes_count: 0,
      // created_at will be set by database default
    };

    // 4. Insert into posts table
    const { data, error } = await supabase
      .from("posts")
      .insert([newPost])
      .select()
      .single();

    if (error) throw error;

    // 5. Update store (prepend new post to feed)
    set((state) => ({
      feeds: [data, ...(state.feeds ||[])],
      error: null,
    }));
  }
    toast.success("Post added successfully!");
  } catch (error) {
    console.error("Error posting:", error);
    toast.error("Failed to add post. Please try again.");
    throw error;
  }
};