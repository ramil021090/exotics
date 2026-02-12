import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = "https://eyqhyyrxhacdrciycbmv.supabase.co"
// const supabaseAnonKey = "sb_publishable_9bmAC_ns-cNh6gMxYNShXg_AV_IRiSk"
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);

export default supabase;