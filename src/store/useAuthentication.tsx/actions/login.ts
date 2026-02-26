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
  set({ user: data.user, session: data.session, isLoading: false });
  toast.success("Login successfully!")
  } catch (error) {
    console.error(`Failed to login${error}`);
    toast.error("Invalid login credentials!");
  }
};
