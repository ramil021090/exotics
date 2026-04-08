import AddKeeper from "../features/keepers/AddKeeper";
import Subheader from "../ui/Subheader";

const Keepers = () => {
  return (
    <div className="flex flex-col w-full mx-auto h-screen">
      <Subheader title="Invite new Keeper" />

      <AddKeeper />
    </div>
  );
};

export default Keepers;
