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
import Spinner from "../../ui/Spinner";
import { createPortal } from "react-dom";

const DisplayTable = ({ data }: { data: Items }) => {
  const [showForm, setShowForm] = useState(false);
  const [showSmallModal, setShowSmallModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const deleteItem = useExoStore((state) => state.deleteItem);

  const { loading } = useExoStore();
  const handleToggle = () => {
    setShowForm((prev) => !prev);
  };
  if (loading) return <Spinner size={32} />;
  return (
    <>
      {loading && (
        <Modal>
          <TextModal text="Deleting Item.." />
        </Modal>
      )}
      <div className="flex  justify-end dark:bg-slate-800 relative">
        {showSmallModal && (
          <SmallModal onClose={() => setShowSmallModal(false)}>
            <div className="flex flex-col ">
              <Button
                icon={<RiDeleteBin6Fill />}
                variant="success"
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
                variant="success"
                title="edit"
                type="button"
                size="sm"
              />
            </div>
          </SmallModal>
        )}
        <button className=" mb-2" onClick={() => setShowSmallModal((t) => !t)}>
          <FaEllipsisVertical />
        </button>
      </div>

      <div key={data?.id} className=" mb-1   rounded-lg dark:bg-slate-800">
        <div className=" flex justify-between dark:bg-slate-800 relative ">
          <div className="flex flex-col items-start">
            {/* <div className="">
              {data.isSold ? (
                <p className="text-red-600 text-8xl font-bold relative top-30 left-0 opacity-50">
                  Sold
                </p>
              ) : (
                " "
              )}
            </div> */}

            <div>{data.category || <Spinner size={5} />}</div>
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
            src={data.images ?? <Spinner size={5} />}
            alt={`species${data.id}`}
            className={`w-24 h-24    
                      sm:w-32 sm:h-32                     
                      md:w-40 md:h-40                    
                      lg:w-48 lg:h-48                     
                      xl:w-56 xl:h-56    
                      rounded-sm
                      shadow-md
                      object-cover 
                      cursor-pointer
                      transition-transform
                      hover:scale-105
            `}
            onClick={() => setIsOpen(true)}
          />
        </div>
        {isOpen &&
          createPortal(
            <div
              className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              <img
                src={data.images ?? <Spinner size={5} />}
                className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg"
              />
            </div>,
            document.body,
          )}
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
