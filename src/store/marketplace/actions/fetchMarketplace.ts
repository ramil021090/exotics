

import supabase from "../../../supabase/supabaseClients";
import type { MarketplaceStoreProps } from "./utility/types";

export const fetchMarketplace = async (
  set: (state: Partial<MarketplaceStoreProps>) => void,
) => {
  set({ loading: true }); 
  try {
    const { data, error } = await supabase
      .from('marketplace')
      .select(`
        *,
        profiles!profiles_id (*),
        species!species_id (*)
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;

    set({ itemData: data || [], loading: false, error: null });
    console.log(data);
  } catch (error) {
    console.error('Error fetching marketplace:', error);
    set({ loading: false, error: error instanceof Error ? error.message : 'Failed to fetch' });
  }
};