// actions/fetchFeed.ts
import supabase from "../../../supabase/supabaseClients";
import type { FeedStore, Post } from "./utility/types";

export const fetchFeed = async (
  set: (state: Partial<FeedStore>) => void
) => {
  set({ loading: true, error: null });
  try {
    const { data, error } = await supabase
  .from('posts')
  .select(`
      *,
    profiles:user_id (*),
    comments (*, profiles:user_id (*))
  `)
      .order('created_at', { ascending: false });

    if (error) throw error;

    set({ feeds: data as Post[] || [], loading: false });
  } catch (error) {
    console.error('Error fetching feed:', error);
    set({ loading: false, error: error instanceof Error ? error.message : 'Failed to load feed' });
  }
};