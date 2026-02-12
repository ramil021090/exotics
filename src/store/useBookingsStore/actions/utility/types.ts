
export interface Bookings {
  id: number;
  category: string;
  descriptions: string;
  comment:string
  price: number;
  images: string;
  isDeal: boolean;
  created_at?: string | number;
  update_at?:string;
}

export type ItemFormData = Omit<Bookings, "id" | "created_at" | "updated_at">;
export type ItemUpdateData = Partial<Omit<Bookings, "id" | "created_at" | "updated_at">>;

export interface BookingsStoreState {
  items: Bookings[];
  loading: boolean;
  error: string | null;
  selectedItem: Bookings | null;
}


export interface BookingsStoreProps {
  bookings: Bookings[];
  error?: string | null;
  loading:boolean;
  fetchBookings: () => Promise<void>;
  // addItem: (itemData: Omit<Items, "id" | "created_at">) => Promise<void>;
  // deleteItem: (id: number) => Promise<void>;
  // updateItem: (id:  number, updatedData: Partial<Omit<Items, "id" | "created_at">>) => Promise<void>;
  // updateItem: (id: number, item: Partial<Items>) => Promise<void>

}
