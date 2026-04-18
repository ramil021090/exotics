import { create } from "zustand";
import type {  FeedStore } from "./actions/utility/types";
import { fetchFeed } from "./actions/fetchFeeds";
import { addPost,  } from "./actions/addPost";
import { fetchProfile } from "./actions/fetchProfile";
import { loadMore } from "./actions/loadMore";
import { deletePost } from "./actions/deletePost";
import { editPost } from "./actions/editPost";

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
  addPost:async( ...props)=>{
    await addPost(set,...props)

  },
  deletePost:async(...props)=> {
    await deletePost(set,...props)
    
  },
  editPost: (...props) => editPost(set, ...props),
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