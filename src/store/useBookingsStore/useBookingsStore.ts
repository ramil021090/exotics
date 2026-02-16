import { create } from "zustand";
import type { BookingsStoreProps } from "./actions/utility/types";
import { fetchBookings } from "./actions/fetchBookings";



export const useBookingsStore = create<BookingsStoreProps>((set,get) => ({

  bookings: [],
  count:0,

  pageSize:5,
  pageCount:0,
  currentPage:1,
  
  error: null,
  loading: false,

  fetchBookings: () => fetchBookings(set,get),
  
  
  
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