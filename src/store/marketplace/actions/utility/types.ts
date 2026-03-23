import type { Items } from "../../../useExoStore/actions/utility/types";

interface User{
  first_name?: string | null;
  last_name?: string | null;
  username?:string|null
}




export interface DataMarketProps {
  id?: number;
  comment?:string
  status?:string;
  created_at?: string | number;
  keepers?: User | null;
  species?:Items|null
  keepers_id?:number |null
  species_id?:number |null
}

export type ItemFormData = Omit<DataMarketProps, "id" | "created_at" | "updated_at">;
export type ItemUpdateData = Partial<Omit<DataMarketProps, "id" | "created_at" | "updated_at">>;



export interface MarketplaceStoreProps {

  itemDetails: DataMarketProps | null;
  loading: boolean;
  error: string | null;
  
  itemData: DataMarketProps[];
  // selectedItem?: DataProps | null;
  // count:number;
  
  // currentPage: number;
  // pageSize: number;
  // pageCount: number;

  


  fetchMarketplace: () => Promise<void>;
  // prefetchBookingsPage: (page?:number) => Promise<void>;
  // getBookingsDetail: (id:number) => Promise<void>;


  // setSelectedItem?:(item: BookingsProps | null) => void;
  // addItem: (itemData: Omit<Items, "id" | "created_at">) => Promise<void>;
  // deleteItem: (id: number) => Promise<void>;
  // updateItem: (id:  number, updatedData: Partial<Omit<Items, "id" | "created_at">>) => Promise<void>;
  // updateItem: (id: number, item: Partial<Items>) => Promise<void>

}