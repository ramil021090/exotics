import { create } from "zustand";
import { fetchItems } from "./actions/fetchItems";
import { addItem } from "./actions/addItem";
import { deleteItem } from "./actions/deleteItem";

import { updateItem } from "./actions/updateItem";

import type { ExoStoreProps } from "./actions/utility/types";
import { loadMore } from "./actions/loadMore";


export const useExoStore = create<ExoStoreProps>((set,get) => ({
  items: [],
  error: null,
  loading: false,
  loadingMore:false,
  page:1,
  hasMore:true,

  fetchItems: () => fetchItems(set,),
  
  addItem: (...props) => addItem(set,...props),
  
  deleteItem: async (...props) =>{return deleteItem(set, ...props)},

  updateItem: (...props) => updateItem(set, ...props),

  loadMore: async()=>{
    await  loadMore(set,get)
    console.log('loadMore called, page:', get().page, 'hasMore:', get().hasMore);
  },
  reset: () => {
    set(
      { items: [], error: null, loading: false, page: 1, loadingMore: false, hasMore: true }
    );
  },


}));