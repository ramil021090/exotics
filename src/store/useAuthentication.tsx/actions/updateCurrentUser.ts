import type { UserAttributes } from "@supabase/supabase-js";
import supabase from "../../../supabase/supabaseClients";
import type { IFormInput, UpdateProfileForm } from "./utility/types";


export interface UpdateProfileForm {
  password?: Password;
  confirmPassword?: Password;
  avatar?: FileList;
  username?:string
  email:string
}

export const updateCurrentUser=async(
  set: (state: Partial<IFormInput>) => void,
   { password,username, avatar }: UpdateProfileForm
)=>{
  set({isLoading:true})
try{


     const updateData: UserAttributes = {};
     if(password)updateData.password=password
     if(username)updateData.data={...updateData.data,username}

    let currentUser = null;

      // Only proceed if there's something to update
    if (Object.keys(updateData).length === 0) {
      const {data}=await supabase.auth.getUser()
      currentUser = data.user;
    }else{
      const { data, error } = await supabase.auth.updateUser(updateData);
      if (error) throw error;
      currentUser = data.user;
      }

    //  Upload new avatar (if provided)
    if (avatar) {
    // Ensure we have a valid File object
      const file = avatar instanceof File ? avatar : (avatar as FileList)?.[0];
      if (!file || !file.type.startsWith('image/')) {
        throw new Error('Please select a valid image file (jpg, png, etc.)');
      }

    // Generate unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `avatar-${currentUser?.id}-${Date.now()}.${fileExt}`;

     // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: true, // Replace if exists
        });
      if (uploadError) throw uploadError;  

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);
      const avatarUrl = urlData.publicUrl;

      // Update user metadata with avatar URL
      const { data: updatedUser, error: metadataError } = await supabase.auth.updateUser({
        data: { avatar_url: avatarUrl },
      });
      if (metadataError) throw metadataError;

      currentUser = updatedUser.user;

    }  

    if (currentUser) {
      set({ user: currentUser,isLoading:false });
    }
  
}catch(error){
  console.error(error);
}
}