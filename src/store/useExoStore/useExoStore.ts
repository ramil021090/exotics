import { create } from "zustand";
import { fetchItems } from "./actions/fetchItems";
import { addItem } from "./actions/addItem";
import { deleteItem } from "./actions/deleteItem";

import { updateItem } from "./actions/updateItem";

import type { ExoStoreProps } from "./actions/utility/types";


export const useExoStore = create<ExoStoreProps>((set,) => ({
  items: [],
  error: null,
  loading: false,

  fetchItems: () => fetchItems(set),
  
  addItem: (...props) => addItem(set,...props),
  
  deleteItem: async (...props) =>{return deleteItem(set, ...props)},

  updateItem: (...props) => updateItem(set, ...props),

  // updateItem: async (id, updatedData) => {
  //   await updateItem(set, id, updatedData);
  //   // After updating, refresh the items list
  //   await get().fetchItems();
  // },
//   updateItem: async (id, updatedData) => {

  
//   return updateItem(set, id, updatedData);
// },
}));