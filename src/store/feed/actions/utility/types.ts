// actions/utility/types.ts

import type { ReactNode } from "react";

export interface Profile {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  avatar_url: string;
  created_at: string;
}

export interface Comment {
  id: number;
  post_id: number;
  user_id: string;
  content: string;
  created_at: string;
  profiles: Profile;  
}

export interface Post {
  id: number;
  user_id: string;
  content: string;
  image_url?: string;
  created_at: string;
  likes_count: number;
  profiles: Profile;       
  comments: ReactNode;     
}

export interface FeedStore {
  feeds: Post[] | null;
  loading: boolean;
  error: string | null;
  fetchFeed: () => Promise<void>;
}