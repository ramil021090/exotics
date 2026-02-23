import type { Items } from "../../../useExoStore/actions/utility/types";

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
interface BookingDetail {
  id: number;
  category: string;
  description: string;
  comment:string
  status:string
  species:Items
  users:User
}

export interface BookingsProps {
  id: number;
  category:string
  images: string;
  status:string;
  created_at?: string | number;
  users?: User | null;
  species:Species|null
}

export type ItemFormData = Omit<BookingsProps, "id" | "created_at" | "updated_at">;
export type ItemUpdateData = Partial<Omit<BookingsProps, "id" | "created_at" | "updated_at">>;

// export interface BookingsStoreState {
//   items: BookingsProps[];
//   loading: boolean;
//   error: string | null;
//   selectedItem: BookingsProps | null;
// }


export interface BookingsStoreProps {

  bookingDetail: BookingDetail | null;
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
