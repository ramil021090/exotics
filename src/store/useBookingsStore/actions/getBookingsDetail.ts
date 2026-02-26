import supabase from "../../../supabase/supabaseClients";
import type { BookingsStoreProps } from "./utility/types";


export const getBookingsDetail= async (  set: (state: Partial<BookingsStoreProps>) => void,
   id:number) => {
   if (!id) return;
    set({ loading: true, error: null, bookingDetail: null });
    try {
      const { data, error } = await supabase
        .from("bookings")
        .select("*, species(*), keepers(*)") 
        .eq("id", id)
        .single();
      if (error) throw error;
      set({ bookingDetail: data, loading: false });
    } catch (err) {
      set({ error: (err as Error).message, loading: false });
    }
}
