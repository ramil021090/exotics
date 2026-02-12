import { useState } from "react";
import { FaEllipsisVertical } from "react-icons/fa6";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { MdModeEdit } from "react-icons/md";

import { useExoStore } from "../../store/useExoStore/useExoStore";
import type { Items } from "../../store/useExoStore/actions/utility/types";

import SmallModal from "../../modals/SmallModal";
import TextModal from "../../modals/TextModal";
import Modal from "../../modals/Modal";

import Button from "../../ui/Button";
import AddandEditItemForm from "./AddandEditItemForm ";

const DisplayTable = ({ data }: { data: Items }) => {
  const [showForm, setShowForm] = useState(false);
  const [showSmallModal, setShowSmallModal] = useState(false);

  const deleteItem = useExoStore((state) => state.deleteItem);
  const { loading } = useExoStore();
  const handleToggle = () => {
    setShowForm((prev) => !prev);
    console.log("showForm:", showForm);
  };
  return (
    <>
      {loading && (
        <Modal>
          <TextModal text="Deleting Item.." />
        </Modal>
      )}
      <div className="flex  justify-end relative">
        {showSmallModal && (
          <SmallModal onClose={() => setShowSmallModal(false)}>
            <Button
              icon={<RiDeleteBin6Fill />}
              title="delete"
              type="button"
              size="sm"
              onDelete={async (id) => {
                await deleteItem(id);
                setShowSmallModal(false);
              }}
              deleteId={data.id}
            />
            <Button
              onToggle={() => {
                handleToggle();
                setShowSmallModal(false);
              }}
              icon={<MdModeEdit />}
              title="edit"
              type="button"
              size="sm"
            />
          </SmallModal>
        )}
        <button className="px-5" onClick={() => setShowSmallModal((t) => !t)}>
          <FaEllipsisVertical />
        </button>
      </div>

      <div key={data?.id} className=" mb-1 mr-2 p-2 rounded-lg">
        <div className=" xl:flex gap-4 mb-2">
          <div className="text-xl">
            <div className="">
              {data.isSold ? (
                <p className="text-red-600 text-8xl font-bold relative top-30 left-0 opacity-50">
                  Sold
                </p>
              ) : (
                " "
              )}
            </div>

            <div>{data.category || "loading"}</div>
            <div>
              {" "}
              {data.created_at
                ? new Date(data.created_at).toLocaleDateString()
                : "No date"}
            </div>
            <div className="mt-2 mb-2"> {data?.descriptions}</div>
            <div>
              {data.price > 0 ? "amount:" : " "}
              {data.price > 0 ? data?.price : " "}
            </div>
          </div>

          <img
            src={data.images || "loading"}
            alt={`species${data.id}`}
            className="max-w-58 h-full mr-2"
          />
        </div>
        {showForm && (
          <Modal key={data.id}>
            <AddandEditItemForm
              onToggle={handleToggle}
              showForm={showForm}
              setOpen={setShowForm}
              displayTableToEdit={data}
            />
          </Modal>
        )}
      </div>
    </>
  );
};

export default DisplayTable;
