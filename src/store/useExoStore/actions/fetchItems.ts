import supabase from "../../../supabase/supabaseClients";
import type { ExoStoreProps } from "./utility/types";


export const fetchItems= async (set: (state: Partial<ExoStoreProps>) => void) => {
    try {
      const { data, error } = await supabase
        .from("species")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) {
        throw error;
      }

      set({ items: data || [] })
    } catch (error) {
      console.error(error)
    }
  };