
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
  content: string;
  images: FileList | null;

};

export interface FeedStore {
  feeds: Post[] | null;
  profile:Profile | null;
  loading: boolean;
  error: string | null;
  fetchFeed: () => Promise<void>;
  fetchProfile:(id:string)=>Promise<void>
  addPost:(postData:AddPostData)=>Promise<void>
}