import SmallModal from "../../modals/SmallModal";
import type { BookingsProps } from "../../store/useBookingsStore/actions/utility/types";
import DisplayRow from "../../ui/DisplayRow";
import DisplayRowTableContents from "../../ui/DisplayRowTableContents";
import { FaEllipsisVertical, FaEye } from "react-icons/fa6";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface BookingsDisplayTableProps {
  data: BookingsProps;
}
type Status = "unconfirmed" | "confirmed";

const BookingsDisplayTable = ({ data }: BookingsDisplayTableProps) => {
  const [openId, setOpenId] = useState(false);

  const navigate = useNavigate();

  const statusTagname: Record<Status, string> = {
    unconfirmed: " text-red-700",
    confirmed: "text-green-800",
  };

  if (!data) return <h1>No bookings found</h1>;

  const handleToggle = () => {
    setOpenId((prev) => !prev);
  };

  return (
    <>
      <DisplayRow>
        <DisplayRowTableContents className="text-left">
          {data.created_at
            ? new Date(data.created_at).toLocaleDateString()
            : "No Date"}
        </DisplayRowTableContents>
        <DisplayRowTableContents className="text-left">
          {data.species?.category ?? " "}
        </DisplayRowTableContents>
        <DisplayRowTableContents className="text-left">
          {data.species?.descriptions ?? " "}
        </DisplayRowTableContents>
        <DisplayRowTableContents className="text-right">
          {data.species?.price?.toLocaleString() ?? " "}
        </DisplayRowTableContents>
        <DisplayRowTableContents className="text-left">
          {data.users?.firstName ?? " "}
          {" _"}
          <span>{data.users?.lastName ?? " "}</span>
        </DisplayRowTableContents>
        <DisplayRowTableContents
          className={`border rounded-lg my-1 bg-white  ${statusTagname[data.status as Status]}`}
        >
          {data.status}
        </DisplayRowTableContents>
        {/* <DisplayRowTableContents className=" flex text-right">
          {data.comment}
        </DisplayRowTableContents> */}
        <div className="flex justify-end relative">
          <button
            className="hover:bg-slate-300 my-2 rounded-sm"
            onClick={handleToggle}
          >
            <FaEllipsisVertical />
          </button>

          {openId && (
            <SmallModal
              onClose={() => {
                setOpenId(false);
              }}
            >
              <div className="flex items-center">
                <FaEye />{" "}
                <button
                  className=" min-w-25"
                  onClick={() => navigate(`/bookingsDetails/${data.id}`)}
                >
                  see details
                </button>
              </div>
            </SmallModal>
          )}
        </div>
      </DisplayRow>
    </>
  );
};

export default BookingsDisplayTable;
