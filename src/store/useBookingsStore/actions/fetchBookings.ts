import supabase from "../../../supabase/supabaseClients";
import type { BookingsStoreProps } from "./utility/types";


export const fetchBookings = async (
  set: (state: Partial<BookingsStoreProps>) => void,
  get: () => BookingsStoreProps,
) => {
 
  
  try {
  set({ loading: true, error: null });
    const { pageSize, currentPage } = get();
    const from = (currentPage - 1) * pageSize;
    const to = from + pageSize - 1;
  
  

    const { data, error, count } = await supabase
      .from("bookings")
      .select(`*, species(*), keepers(*)`, { 
        count: "exact" 
      })
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) throw error;

    const pageCount = count ? Math.ceil(count / pageSize) : 0;

    set({ 
      bookings: data || [], 
      count: count || 0,
      currentPage,
      pageCount,
      loading: false 
    });
  } catch (error) {
    console.error(error);
    set({ 
      error: error instanceof Error ? error.message : "Failed to fetch bookings",
      loading: false 
    });
  }
};

