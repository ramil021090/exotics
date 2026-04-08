import KeepersList from "../features/keepers/KeepersList";

const Keepers = () => {
  return (
    <div
      className="
      flex
      sticky
      top-10
      flex-col
      h-screen
      w-full
      max-w-37
              "
    >
      <KeepersList />
    </div>
  );
};

export default Keepers;
