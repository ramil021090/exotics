// actions/fetchFeed.ts
import supabase from "../../../supabase/supabaseClients";
import {  PAGE_SIZE, type FeedStore } from "./utility/types";

export const fetchFeed = async (
  set: (state: Partial<FeedStore>) => void,
) => {
  set({ loading: true, error: null });
  try {
    const from = 0;
    const to = PAGE_SIZE - 1;

    const { data, error,count } = await supabase
        .from('posts')
        .select(`
              *,
              profiles:user_id (*),
              comments (*, profiles:user_id (*))
          `,{count:"exact"})
      .order('created_at', { ascending: false })
      .range(from,to)

    if (error) throw error;
    
    const hasMore=(count||0)>PAGE_SIZE

    set({ feeds: data ?? [],hasMore, loading: false,page:1 });
  } catch (error) {
    console.error('Error fetching feed:', error);
    set({ loading: false, error: error instanceof Error ? error.message : 'Failed to load feed' });
  }
};