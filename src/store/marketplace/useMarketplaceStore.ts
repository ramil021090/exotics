import { create } from "zustand";
import supabase from "../../supabase/supabaseClients";
import type { MarketplaceStoreProps } from "./actions/utility/types";


export const useBookingsStore = create<MarketplaceStoreProps>((set,get) => ({
 itemDetails:null,
  itemData: [],
  count:0,

  pageSize:3,
  pageCount:0,
  currentPage:1,
  
  error: null,
  loading: false,


  fetchMarketplace: async () => {
    // if (page) {
    //   set({ currentPage: page });
    // }
    await fetchMarketplace(set, get);},

  // prefetchBookingsPage:async(page?:number)=>{
  //   await prefetchBookingsPage( get, page);
  // },
  
//  getBookingsDetail: async (id?: number) => {

//     if (!id) return;
//     set({ loading: true, error: null, bookingDetail: null });
//     try {
//       const { data, error } = await supabase
//         .from("bookings")
//         .select("*, species(*), keepers(*)") 
//         .eq("id", id)
//         .single();
//       if (error) throw error;
//       set({ bookingDetail: data, loading: false });
//     } catch (err) {
//       set({ error: (err as Error).message, loading: false });
//     }
//   },

}));
// addItem: (...props) => addItem(set,...props),

// deleteItem: async (...props) =>{return deleteItem(set, ...props)},

// updateItem: (...props) => updateItem(set, ...props),

// updateItem: async (id, updatedData) => {
//   await updateItem(set, id, updatedData);
//   // After updating, refresh the items list
//   await get().fetchItems();
// },
//   updateItem: async (id, updatedData) => {


//   return updateItem(set, id, updatedData);
// },