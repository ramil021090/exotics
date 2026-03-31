import toast from "react-hot-toast";
import supabase from "../../../supabase/supabaseClients";
import type {  AuthState, Credentials} from "./utility/types";

export const login = async (
    set: (state: Partial<AuthState>) => void,
    { email, password }: Credentials) => {

set({isLoading:true})
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
      set({ 
      user: data.user, 
      session: data.session, 
      isLoading: false, 
      error: null 
    });
    const name=data.user?.user_metadata?.username;
  toast.success(`Welcome, Keeper ${name? name[0].toUpperCase() + name.slice(1) : " "} !`)
  } catch (error) {
    console.error(`Failed to login${error}`);
     set({ 
      user: null, 
      session: null, 
      isLoading: false, 
      error: error instanceof Error ? error.message : "Invalid login credentials" 
    });
    toast.error("Invalid login credentials!");
  }
};
