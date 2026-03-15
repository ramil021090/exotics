import toast from "react-hot-toast";
import supabase from "../../../supabase/supabaseClients";
import type { IFormInput } from "./utility/types";

export interface UpdateProfileForm {
  password?: string;
  confirmPassword?: string;
  avatar?: string;
}

export const updateCurrentUser=async(
  set: (state: Partial<IFormInput>) => void,
   { password, avatar }: UpdateProfileForm
)=>{
try{
      const updateData: {
      password?: string;
      data?: Record<string, unknown>;
    } = {};

    if (password) {
      updateData.password = password;
    }

    // If avatar URL is provided, add it to user metadata
    if (avatar) {
      updateData.data = {
        ...(updateData.data || {}),
        avatar_url: avatar, // store the URL under a field you prefer
      };
    }

    // If nothing to update, throw early
    if (Object.keys(updateData).length === 0) {
      throw new Error("No changes provided.");
    }

    const { data, error } = await supabase.auth.updateUser(updateData);
    if (error) throw error;

    // Update Zustand store with the new user object
    set({ user: data.user });

  
}catch(error){
  console.error(error);
}
}