import { create } from "zustand";
import type { AuthState, Credentials, IFormInput } from "./actions/utility/types";
import { getCurrentUser } from "./actions/getCurrentUser";
import { login } from "./actions/login";
import { logout } from "./actions/logout";
import { signup } from "./actions/signup";
import { updateCurrentUser } from "./actions/UpdateCurrentUser";


export const useAuthenticationStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  isLoading: false,
  error: null,

  login: async ({ email, password }:Credentials) =>  {await login( set,{ email,password})},
  logout:async()=>{await logout(set)},
  getCurrentUser:async()=>{await getCurrentUser(set)},
  signup: async(formData:IFormInput)=>{await signup(set,formData)},
  updateCurrentUser: (userData) => updateCurrentUser(set, userData)
    
  }))