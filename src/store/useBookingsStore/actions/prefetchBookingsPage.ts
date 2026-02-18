import supabase from "../../../supabase/supabaseClients";
import type { BookingsStoreProps } from "./utility/types";


export const prefetchBookingsPage = async (
  // set: (state: Partial<BookingsStoreProps>) => void,
  get: () => BookingsStoreProps,page?:number) => {
  const { currentPage, pageSize,pageCount } = get();

  const targetPage=page||currentPage+1

      if (targetPage < 1 || targetPage > pageCount || targetPage === currentPage) {
      return;
    }
  
  try {
    const from = (targetPage - 1) * pageSize;
    const to = from + pageSize - 1;
    
    await supabase
      .from("bookings")
      .select("id") // Select minimal data for prefetch
      .range(from, to);
  } catch (error) {
    console.error(`Failed to fetch page ${targetPage},${error}`);
  }
};