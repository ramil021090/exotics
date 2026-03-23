import { create } from "zustand";
import type { AddPostData, FeedStore, } from "./actions/utility/types";
import { fetchFeed } from "./actions/fetchFeeds";
import { addPost,  } from "./actions/addPost";

export const useNewsFeedStore = create<FeedStore>((set) => ({
  feeds: [],
  loading: false,
  error: null,

  fetchFeed: async () => {
    await fetchFeed(set);
  },
  addPost:async( postData: AddPostData)=>{
    await addPost(set,postData)
  }
}));