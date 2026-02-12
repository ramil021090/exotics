import { useState } from "react";
import Button from "../../ui/Button";
import Modal from "../../modals/Modal";
import AddandEditItemForm from "./AddandEditItemForm ";

const AddandEditItem = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleToggle = () => {
    setOpenModal((prev) => !prev);
  };

  return (
    <div className="m-2">
      <Button
        title="add item"
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
