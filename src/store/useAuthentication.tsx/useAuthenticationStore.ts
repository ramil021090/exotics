import { create } from "zustand";
import type { AuthState, Credentials } from "./actions/utility/types";
import { login } from "./actions/login";
import { getCurrentUser } from "./actions/getCurrentUser";


export const useAuthenticationStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  isLoading: false,
  error: null,

  login: async ({ email, password }:Credentials) =>  {await login( set,{ email,password})},
  getCurrentUser:async()=>{await getCurrentUser(set)}
    
  }))