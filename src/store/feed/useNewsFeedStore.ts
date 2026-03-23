import { create } from "zustand";
import type { FeedStore } from "./actions/utility/types";
import { fetchFeed } from "./actions/fetchFeeds";

export const useNewsFeedStore = create<FeedStore>((set) => ({
  feeds: null,
  loading: false,
  error: null,

  fetchFeed: async () => {
    await fetchFeed(set);
  },
}));