import toast from "react-hot-toast";
import supabase from "../../../supabase/supabaseClients";
import type {  AuthState, Credentials} from "./utility/types";

export const login = async (
    set: (state: Partial<AuthState>) => void,
    { email, password }: Credentials) => {

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
  toast.success("Login successfully!")
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
