import { create } from "zustand";
import type { AuthState, Credentials } from "./actions/utility/types";
import { login } from "./actions/login";
import { getCurrentUser } from "./actions/getCurrentUser";
import { logout } from "./actions/logout";


export const useAuthenticationStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  isLoading: false,
  error: null,

  login: async ({ email, password }:Credentials) =>  {await login( set,{ email,password})},
  logout:async()=>{await logout(set)},
  getCurrentUser:async()=>{await getCurrentUser(set)}
    
  }))