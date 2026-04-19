import supabase from "../../../supabase/supabaseClients";
import { PAGE_SIZE, type ExoStoreProps } from "./utility/types";

 export const loadMore= async (
  set:(state:Partial<ExoStoreProps>)=>void,
  get:()=>ExoStoreProps
) => {
    const { loadingMore, hasMore, page, items } = get();

    if (loadingMore || !hasMore) return;

    set({ loadingMore: true });
    try {
      const nextPage = page + 1;
      const from = page * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      const { data, error, count } = await supabase
        .from('species')
        .select(
         `*`,
          { count: 'exact' }
        )
        .order('created_at', { ascending: false })
        .range(from, to);

      if (error) throw error;

      const newItems = [...items, ...(data || [])];
      const hasMoreData = (count ?? 0) > (nextPage * PAGE_SIZE);
      console.log('loadMore called, page:', get().page, 'hasMore:', get().hasMore);

      set({
        items: newItems,
        page: nextPage,
        hasMore: hasMoreData,
        loadingMore: false,
      });
    } catch (error) {
      console.error(error);
      set({ loadingMore: false, error: (error as Error).message });
    }
  }