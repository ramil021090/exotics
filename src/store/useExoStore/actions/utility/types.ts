import type { ReactNode } from "react";

export interface Items {
  id: number;
  category: string;
  descriptions: string;
  price: number;
  images: string;
  isSold: boolean;
  created_at?: string | number;
  update_at?:string;
  [key: string]: ReactNode; 
}

export type ItemFormData = Omit<Items, "id" | "created_at" | "updated_at">;
export type ItemUpdateData = Partial<Omit<Items, "id" | "created_at" | "updated_at">>;

export interface ExoStoreState {
  items: Items[];
  loading: boolean;
  error: string | null;
  selectedItem: Items | null;
}


export interface ExoStoreProps {
  items: Items[];
  error?: string | null;
  loading:boolean;
  fetchItems: () => Promise<void>;
  addItem: (itemData: Omit<Items, "id" | "created_at">) => Promise<void>;
  deleteItem: (id: number) => Promise<void>;
  // updateItem: (id:  number, updatedData: Partial<Omit<Items, "id" | "created_at">>) => Promise<void>;
  updateItem: (id: number, item: Partial<Items>) => Promise<void>

}

// export type ExoStore = ExoStoreState & ExoStoreProps;