import type { User, Session } from '@supabase/supabase-js';

export interface Credentials {
  email: string;
  password: string;
}



export interface AuthState {
  user: User | null;
  session: Session| null;
  isLoading: boolean;
  error: string | null;
  login: (credentials: Credentials) => Promise<void>;
  getCurrentUser:()=>Promise<void>
  // logout: () => Promise<void>; // optional
}