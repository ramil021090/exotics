import supabase from "../../../supabase/supabaseClients";
import type {  AuthState} from "./utility/types";

export const getCurrentUser = async (
    set: (state: Partial<AuthState>) => void) => {

  try {
    const { data,error } = await supabase.auth.getSession()


    if (error) throw error;

    const session = data.session

    set({
      user: session?.user ?? null,
      session: session ?? null,
      isLoading: false,
      error: null,
    });

  console.log("Current User/session:",session);
  } catch (error) {
    console.error(`Failed to get the current user${error}`);
    set({
      user: null,
      session: null,
      isLoading: false,
      error:  "Failed to fetch session",
    });
  }
};
