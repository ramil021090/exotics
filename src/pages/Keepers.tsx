import SignupForm from "../features/authentication/SignupForm";
import Subheader from "../ui/Subheader";
import { GoPlus } from "react-icons/go";
import { useState } from "react";

const Keepers = () => {
  const [addKeeper, setAddKeeper] = useState(false);

  const handleToggle = () => {
    setAddKeeper(!addKeeper);
  };
  return (
    <div className="lg:flex flex-col items-start hidden pt-48">
      <Subheader classname="sticky" title="Invite new Keeper" />
      {addKeeper && <SignupForm />}
      {!addKeeper && (
        <button onClick={handleToggle}>
          <h1 className="flex items-center">
            Keeper{" "}
            <span>
              <GoPlus />
            </span>
          </h1>
        </button>
      )}
    </div>
  );
};

export default Keepers;
