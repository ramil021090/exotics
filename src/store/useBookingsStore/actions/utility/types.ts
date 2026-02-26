import type { Items } from "../../../useExoStore/actions/utility/types";

interface User{
  firstName: string | null;
  lastName: string | null;
}




export interface BookingsProps {
  id: number;
  comment:string
  status:string;
  created_at?: string | number;
  keepers?: User | null;
  species?:Items|null
  keepers_id?:number |null
  species_id?:number |null
}

export type ItemFormData = Omit<BookingsProps, "id" | "created_at" | "updated_at">;
export type ItemUpdateData = Partial<Omit<BookingsProps, "id" | "created_at" | "updated_at">>;



export interface BookingsStoreProps {

  bookingDetail: BookingsProps | null;
  loading: boolean;
  error: string | null;
  
  bookings: BookingsProps[];
  selectedItem?: BookingsProps | null;
  count:number;
  
  currentPage: number;
  pageSize: number;
  pageCount: number;

  


  fetchBookings: (page?:number) => Promise<void>;
  prefetchBookingsPage: (page?:number) => Promise<void>;
  getBookingsDetail: (id:number) => Promise<void>;


  // setSelectedItem?:(item: BookingsProps | null) => void;
  // addItem: (itemData: Omit<Items, "id" | "created_at">) => Promise<void>;
  // deleteItem: (id: number) => Promise<void>;
  // updateItem: (id:  number, updatedData: Partial<Omit<Items, "id" | "created_at">>) => Promise<void>;
  // updateItem: (id: number, item: Partial<Items>) => Promise<void>

}
