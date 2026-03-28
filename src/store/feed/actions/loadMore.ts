import supabase from "../../../supabase/supabaseClients";
import { PAGE_SIZE, type FeedStore } from "./utility/types";

 export const loadMore= async (
  set:(state:Partial<FeedStore>)=>void,
  get:()=>FeedStore
) => {
    const { loadingMore, hasMore, page, feeds } = get();

    if (loadingMore || !hasMore) return;

    set({ loadingMore: true });
    try {
      const nextPage = page + 1;
      const from = page * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      const { data, error, count } = await supabase
        .from('posts')
        .select(
          `
          *,
          profiles:user_id (*),
          comments (*, profiles:user_id (*))
        `,
          { count: 'exact' }
        )
        .order('created_at', { ascending: false })
        .range(from, to);

      if (error) throw error;

      const newFeeds = [...feeds, ...(data || [])];
      const hasMoreData = (count || 0) > (nextPage * PAGE_SIZE);

      set({
        feeds: newFeeds,
        page: nextPage,
        hasMore: hasMoreData,
        loadingMore: false,
      });
    } catch (error) {
      console.error(error);
      set({ error: (error as Error).message, loadingMore: false });
    }
  }