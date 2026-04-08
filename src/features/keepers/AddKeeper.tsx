import { GoPlus } from "react-icons/go";
import { useState } from "react";
import Modal from "../../modals/Modal";
import InviteNewKeeper from "./InviteNewKeeper";
import KeepersList from "./KeepersList";

const AddKeeper = () => {
  const [addKeeper, setAddKeeper] = useState(false);

  const handleToggle = () => {
    setAddKeeper(!addKeeper);
  };
  return (
    <div className="flex flex-col   ">
      {!addKeeper && (
        <button onClick={handleToggle}>
          <h1 className="flex justify-end ">
            Keeper{" "}
            <span>
              <GoPlus />
            </span>
          </h1>
        </button>
      )}
      <input type="file" />
      <KeepersList />
      {addKeeper && (
        <Modal>
          <InviteNewKeeper onCancel={() => setAddKeeper(false)} />
        </Modal>
      )}
    </div>
  );
};

export default AddKeeper;
