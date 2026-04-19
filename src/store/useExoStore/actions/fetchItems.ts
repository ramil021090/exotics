import supabase from "../../../supabase/supabaseClients";
import { PAGE_SIZE, type ExoStoreProps } from "./utility/types";


export const fetchItems= async (set: (state: Partial<ExoStoreProps>) => void) => {
    try {
      const from = 0;
      const to = PAGE_SIZE - 1;

      const { data, error,count } = await supabase
        .from("species")
        .select("*",{count:"exact"})
        .order("created_at", { ascending: false })
        .range(from,to)

      if (error) {
        throw error;
      }
       const hasMore = (count ?? 0) > PAGE_SIZE;

      set({ items: data?? [],hasMore, loading: false,page:1  })
    } catch (error) {
      console.error(error)
    set({ loading: false, error: error instanceof Error ? error.message : 'Failed to load feed' });

    }
  };