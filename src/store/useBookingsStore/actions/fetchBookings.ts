import supabase from "../../../supabase/supabaseClients";
import type { BookingsStoreProps } from "./utility/types";


export const fetchBookings= async (set: (state: Partial<BookingsStoreProps>) => void) => {
    try {
      const { data, error } = await supabase
        .from("bookings")
        .select("*,species(category,descriptions,price),users(firstName,lastName)")
        .order("created_at", { ascending: false });
      if (error) {
        throw error;
      }

      set({ bookings: data || [] })
    } catch (error) {
      console.error(error)
    }
  };