import Feeds from "../feeds/Feeds";
import Subheader from "../ui/Subheader";

const Homepage = () => {
  return (
    <div className=" bg-slate-50 dark:bg-slate-900 h-screen">
      <Subheader title="Homepage" />
      <Feeds />
    </div>
  );
};

export default Homepage;
