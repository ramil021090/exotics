import React, { useEffect } from "react";
import { useMarketplaceStore } from "../../store/marketplace/useMarketplaceStore";
import Feeds from "../feeds/Feeds";

const MarketPlace = () => {
  const fetchMarketplace = useMarketplaceStore(
    (state) => state.fetchMarketplace,
  );
  useEffect(() => {
    fetchMarketplace();
  }, [fetchMarketplace]);

  console.log(fetchMarketplace);

  return (
    <div className="h-screen">
      <Feeds />
    </div>
  );
};

export default MarketPlace;
