import { useEffect } from "react";
import { useBookingsStore } from "../store/useBookingsStore/useBookingsStore";
import Subheader from "../ui/Subheader";
import BookingsDisplayTable from "../features/bookings/BookingsDisplayTable";
import Pagination from "../ui/Pagination";

const Bookings = () => {
  const bookings = useBookingsStore((state) => state.bookings);
  const fetchBookings = useBookingsStore((state) => state.fetchBookings);
  const { count } = useBookingsStore();

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  return (
    <>
      <Subheader title="Bookings" />
      <div className=" my-4 mx-10  table-auto ">
        <div className="flex justify-between border shadow-lg rounded-md  mb-1 p-4 bg-slate-300">
          <h1 className="px-4 py-2 text-left max-w-fit  bg-amber-400">date</h1>
          <h1 className="px-4 py-2 text-left max-w-fit  bg-amber-400">
            category
          </h1>
          <h1 className="px-4 py-2 text-left max-w-fit  bg-amber-400">
            descriptions
          </h1>
          <h1 className="px-4 py-2 text-left max-w-fit  bg-amber-400">price</h1>
          <h1 className="px-4 py-2 text-left  max-w-fit bg-amber-400 ">
            users
          </h1>
          <h1 className="px-4 py-2 text-left max-w-fit bg-amber-400">status</h1>
          <h1 className="px-4 py-2 text-left max-w-fit bg-amber-400 ">
            comment
          </h1>
        </div>
        {bookings.map((books) => (
          <BookingsDisplayTable data={books} key={books.id} />
        ))}
        <Pagination count={count} />
      </div>
    </>
  );
};

export default Bookings;
