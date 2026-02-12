import supabase from "../../../../supabase/supabaseClients";


///////SAVE TO STORAGE AS WELL//////////
export const uploadToSupabaseStorage = async (file: File): Promise<string> => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;

    // Upload to supabase storage bucket//
    const { error } = await supabase.storage
      .from('exotic-images') 
      .upload(fileName, file);
    if (error) {
      console.error('Storage upload error:', error);
      throw error;
    }
    // Get public URL for the uploaded file//
    const { data: { publicUrl } } = supabase.storage
      .from('exotic-images')
      .getPublicUrl(fileName);

    return publicUrl;
  } catch (error) {
    console.error('Failed to upload to storage:', error);
    throw error;
  }
};
// Type guard functions
export function isFile(value: unknown): value is File {
  return value instanceof File;
}

export function isFileList(value: unknown): value is FileList {
  return (
    typeof value === 'object' &&
    value !== null &&
    'length' in value &&
    Array.from(value as ArrayLike<unknown>).every(item => item instanceof File)
  );
}






//////////
///////////
// const uploadMultipleToStorage = async (files: File[]): Promise<string[]> => {
//   const uploadPromises = files.map(file => uploadToSupabaseStorage(file));
//   return Promise.all(uploadPromises);
// };