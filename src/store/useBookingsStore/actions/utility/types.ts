interface User{
  firstName: string | null;
  lastName: string | null;
}

interface Species{
  id:number|null
  category: string |null;
  price:number |null
  descriptions:string|null
  
  
}

export interface BookingsProps {
  id: number;
  comment:string
  images: string;
  status:string;
  created_at?: string | number;
  users?: User | null;
  species:Species|null
}

export type ItemFormData = Omit<BookingsProps, "id" | "created_at" | "updated_at">;
export type ItemUpdateData = Partial<Omit<BookingsProps, "id" | "created_at" | "updated_at">>;

export interface BookingsStoreState {
  items: BookingsProps[];
  loading: boolean;
  error: string | null;
  selectedItem: BookingsProps | null;
}


export interface BookingsStoreProps {
  bookings: BookingsProps[];
  error?: string | null;
  loading:boolean;
  fetchBookings: () => Promise<void>;
  // addItem: (itemData: Omit<Items, "id" | "created_at">) => Promise<void>;
  // deleteItem: (id: number) => Promise<void>;
  // updateItem: (id:  number, updatedData: Partial<Omit<Items, "id" | "created_at">>) => Promise<void>;
  // updateItem: (id: number, item: Partial<Items>) => Promise<void>

}
