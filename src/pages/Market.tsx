import MarketPlace from "../features/marketplcae/MarketPlace";
import Subheader from "../ui/Subheader";

const Market = () => {
  return (
    <div className="bg-slate-50 dark:bg-slate-900">
      <Subheader title="Market" />
      <MarketPlace />
    </div>
  );
};

export default Market;
