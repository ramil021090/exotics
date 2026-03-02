import toast from "react-hot-toast";
import supabase from "../../../supabase/supabaseClients";
import type { AuthState } from "./utility/types";

export const logout = async (  set: (state: Partial<AuthState>) => void,)=> {

  try {
    await supabase.auth.signOut();
  set({  user: null, session: null, isLoading: false });
  toast.success("Logout successfully!")
  } catch (error) {
    console.error(`Failed to log out${error}`);
  }
};
