import supabase from "../../../supabase/supabaseClients";
import type { FeedStore, Profile } from "./utility/types";

export const fetchProfile = async (
  set: (state: Partial<FeedStore>) => void,
  id:string
) => {
  set({ loading: true, error: null });
      try {
      const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;

    set({ profile: data as Profile, loading: false });
      } catch (error) {
        console.error(error)
    
    }}