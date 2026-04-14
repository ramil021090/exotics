import { create } from "zustand";
import type { AddPostData, FeedStore } from "./actions/utility/types";
import { fetchFeed } from "./actions/fetchFeeds";
import { addPost,  } from "./actions/addPost";
import { fetchProfile } from "./actions/fetchProfile";
import { loadMore } from "./actions/loadMore";
import { deletePost } from "./actions/deletePost";

export const useNewsFeedStore = create<FeedStore>((set,get) => ({
  feeds:[],
  profile:null,
  loadingMore:false,
  page:1,
  hasMore:false,
  loading: false,
  error: null,

  fetchFeed: async () => {
    await fetchFeed(set);
  },
  addPost:async( postData: AddPostData)=>{
    await addPost(set,postData)

  },
  deletePost:async(id:number)=> {
    await deletePost(set,id)
    
  },
fetchProfile:async(id:string)=>{
  return fetchProfile(set,id)
},
loadMore: async()=>{
  await  loadMore(set,get)},
 reset: () => {
    set({
      feeds: [],
      loading: false,
     
    });
  },
}));