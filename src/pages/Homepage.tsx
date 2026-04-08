import MarketPlace from "../features/marketplcae/MarketPlace";
import Subheader from "../ui/Subheader";

const Homepage = () => {
  return (
    <div className=" bg-slate-50 dark:bg-slate-900">
      <Subheader title="Homepage" />
      <MarketPlace />
    </div>
  );
};

export default Homepage;
