// store/utility/uploadImages.ts

import supabase from "../../../../supabase/supabaseClients";

export async function uploadImages(files: File[], bucket = "feeds") {
  const urls: string[] = [];
  for (const file of files) {
    if (!file.type.startsWith("image/")) {
      throw new Error(`Invalid file type: ${file.name}. Only images are allowed.`);
    }
    const fileExt = file.name.split(".").pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;
    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(fileName, file, { cacheControl: "3600", upsert: true });
    if (uploadError) throw uploadError;
    const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(fileName);
    urls.push(urlData.publicUrl);
  }
  return urls;
}