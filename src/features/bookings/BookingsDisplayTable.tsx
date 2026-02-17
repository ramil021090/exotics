import type { BookingsProps } from "../../store/useBookingsStore/actions/utility/types";
import DisplayRow from "../../ui/DisplayRow";
import DisplayRowTableContents from "../../ui/DisplayRowTableContents";

interface BookingsDisplayTableProps {
  data: BookingsProps;
}
type Status = "unconfirmed" | "confirmed";

const BookingsDisplayTable = ({ data }: BookingsDisplayTableProps) => {
  const statusTagname: Record<Status, string> = {
    unconfirmed: " text-red-700",
    confirmed: "text-green-800",
  };

  if (!data) return <h1>No bookings found</h1>;

  return (
    <>
      <DisplayRow>
        <DisplayRowTableContents className="text-left">
          {new Date(data.created_at).toLocaleDateString()}
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
        <DisplayRowTableContents className=" flex text-right">
          {data.comment}
        </DisplayRowTableContents>
      </DisplayRow>
    </>
  );
};

export default BookingsDisplayTable;
