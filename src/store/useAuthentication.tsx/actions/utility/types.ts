import type { User, Session } from '@supabase/supabase-js';

export type Password = string & { readonly __brand: unique symbol };

export interface Credentials {
  email: string;
  password: Password;
}

export interface FullnameInput {
  firstName: string;
  lastName: string;
}

export interface IFormInput {
  fullName?: FullnameInput;
  gender?: "male" | "female" | "other";
  username?: string;
  email?:string;
  password?:Password;
  confirmPassword?: Password;
  user?:User
  avatar?: string;
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
    password?: string;
    confirmPassword?: string;
    avatar?: string;
  }) => Promise<void>;
}