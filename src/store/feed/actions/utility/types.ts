
import type { ReactNode } from "react";

export interface Profile {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  avatar_url: string;
  created_at: string;
  username?:string
}

export interface Comment {
  id: number;
  post_id: number;
  user_id: string;
  content: string;
  created_at: string;
  profiles: Profile;  
  username:string
}

export interface Post {
  id: number;
  user_id: string;
  content?: string;
  image_urls?: string[];
  created_at: string;
  likes_count: number;
  username?:string;
  profiles: Profile;       
  comments?: ReactNode;     
}


export type AddPostData = {
  content?: string;
  images?: File[] | null;

};

export const PAGE_SIZE=5


export interface FeedStore {
  feeds: Post[] ;
  profile:Profile | null;
  loadingMore:boolean;
  hasMore:boolean;
  page:number;
  loading: boolean;
  error: string | null;
  fetchFeed: () => Promise<void>;
  fetchProfile:(id:string)=>Promise<void>
  addPost:(postData:AddPostData)=>Promise<void>
  deletePost:(id:number)=>Promise<void>
  loadMore:()=>Promise<void>
  reset:()=>void
}