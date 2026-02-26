import { useEffect } from "react";
import { useBookingsStore } from "../store/useBookingsStore/useBookingsStore";
import Subheader from "../ui/Subheader";
import BookingsDisplayTable from "../features/bookings/BookingsDisplayTable";
import Pagination from "../ui/Pagination";
import { useSearchParams } from "react-router-dom";

const Bookings = () => {
  const [searchParams] = useSearchParams();

  const bookings = useBookingsStore((state) => state.bookings);
  const fetchBookings = useBookingsStore((state) => state.fetchBookings);
  const { count, pageSize } = useBookingsStore();

  const currentPage = Number(searchParams.get("page")) || 1;

  useEffect(() => {
    fetchBookings(currentPage);
  }, [fetchBookings, currentPage]);

  console.log(bookings);

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
            keeper
          </h1>
          <h1 className="px-4 py-2 text-left max-w-fit bg-amber-400">status</h1>
          <h1 className="px-2 py-2  "> </h1>
        </div>
        {bookings.map((books) => (
          <BookingsDisplayTable data={books} key={books.id} />
        ))}
        <Pagination count={count} pagSize={pageSize} />
      </div>
    </>
  );
};

export default Bookings;
