import { create } from "zustand";
import type { AddPostData, FeedStore } from "./actions/utility/types";
import { fetchFeed } from "./actions/fetchFeeds";
import { addPost,  } from "./actions/addPost";
import { fetchProfile } from "./actions/fetchProfile";

export const useNewsFeedStore = create<FeedStore>((set) => ({
  feeds: [],
  profile:null,
  loading: false,
  error: null,

  fetchFeed: async () => {
    await fetchFeed(set);
  },
  addPost:async( postData: AddPostData)=>{
    await addPost(set,postData)
  },
fetchProfile:async(id:string)=>{
  await fetchProfile(set,id)
}
}));