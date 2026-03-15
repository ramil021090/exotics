import toast from "react-hot-toast";
import supabase from "../../../supabase/supabaseClients";
import type { AuthState, IFormInput } from "./utility/types";

export const signup = async (
    set: (state: Partial<AuthState>) => void,
    formData: IFormInput) => {

  try {
      const { fullName,email,password, gender, username,confirmPassword} = formData;

       if (!fullName) {
      throw new Error("Full name is required");
    }
    
    if (!email) throw new Error("Email is required");
    if (!password) throw new Error("Password is required");
    if (password !== confirmPassword) throw new Error("Passwords do not match");
      const { firstName, lastName } = fullName;


      const { data, error } = await supabase.auth.signUp({
      email,
      password,options:{
        data:{
          firstName,
          lastName,
          username,
          gender,
          avatar:"",
          confirmPassword
        }
      }
    });
    console.log("data:",data);
    if (error) throw error;

  set({ user: data.user });
  toast.success("New member succesfully created")
  } catch (error) {
    console.error(error);
  }
};
