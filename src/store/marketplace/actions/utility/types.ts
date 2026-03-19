import type { Items } from "../../../useExoStore/actions/utility/types";

interface User{
  firstName?: string | null;
  lastName?: string | null;
  username?:string|null
}




export interface DataProps {
  id?: number;
  comment?:string
  status?:string;
  created_at?: string | number;
  keepers?: User | null;
  species?:Items|null
  keepers_id?:number |null
  species_id?:number |null
}

export type ItemFormData = Omit<DataProps, "id" | "created_at" | "updated_at">;
export type ItemUpdateData = Partial<Omit<DataProps, "id" | "created_at" | "updated_at">>;



export interface MarketplaceStoreProps {

  itemDetails: DataProps | null;
  loading: boolean;
  error: string | null;
  
  itemData: DataProps[];
  // selectedItem?: DataProps | null;
  // count:number;
  
  // currentPage: number;
  // pageSize: number;
  // pageCount: number;

  


  fetchMarketpLace: () => Promise<void>;
  // prefetchBookingsPage: (page?:number) => Promise<void>;
  // getBookingsDetail: (id:number) => Promise<void>;


  // setSelectedItem?:(item: BookingsProps | null) => void;
  // addItem: (itemData: Omit<Items, "id" | "created_at">) => Promise<void>;
  // deleteItem: (id: number) => Promise<void>;
  // updateItem: (id:  number, updatedData: Partial<Omit<Items, "id" | "created_at">>) => Promise<void>;
  // updateItem: (id: number, item: Partial<Items>) => Promise<void>

}