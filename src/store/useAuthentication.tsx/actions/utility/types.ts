import type { User, Session } from '@supabase/supabase-js';

export type Password = string & { readonly __brand: unique symbol };

export interface Credentials {
  email: string;
  password: Password;
}

export interface FullnameInput {
  first_name: string;
  last_name: string;
}
export interface UpdateProfileForm {
  password?: Password;
  confirmPassword?: Password;
  avatar?: FileList;
  username?:string
  email:string
}

export interface IFormInput {
  fullName?: FullnameInput | undefined;
  gender?: "male" | "female" | "other";
  username?: string;
  email?:string;
  password?:Password;
  confirmPassword?: Password;
  user?:User
  avatar?: FileList;
  isLoading:boolean
}



export interface AuthState {
  user: User | null;
  session: Session| null;
  isLoading: boolean;
  error: string | null;
  login: (credentials: Credentials) => Promise<void>;
  getCurrentUser:()=>Promise<void>
  logout: () => Promise<void>; 
  signup:(formData:IFormInput)=>Promise<void>
  updateCurrentUser:(data: {
    password?: Password;
    confirmPassword?: Password;
    avatar?: FileList;
    username?:string
  }) => Promise<void>;
}