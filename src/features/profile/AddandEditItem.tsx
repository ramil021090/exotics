import { useState } from "react";
import Button from "../../ui/Button";
import Modal from "../../modals/Modal";
import AddandEditItemForm from "./AddandEditItemForm ";
import { FaPlusCircle } from "react-icons/fa";

const AddandEditItem = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleToggle = () => {
    setOpenModal((prev) => !prev);
  };

  return (
    <div className="m-2 pt-1.5 pb-1 mb-1   dark:bg-slate-900 ">
      <Button
        title={<FaPlusCircle size={32} />}
        variant="success"
        type="button"
        onClick={handleToggle}
      />

      {openModal && (
        <Modal>
          <AddandEditItemForm onToggle={handleToggle} setOpen={setOpenModal} />
        </Modal>
      )}
    </div>
  );
};

export default AddandEditItem;
