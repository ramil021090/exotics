import { useEffect } from "react";
import { useBookingsStore } from "../store/useBookingsStore/useBookingsStore";
import Subheader from "../ui/Subheader";
import BookingsDisplayTable from "../features/bookings/BookingsDisplayTable";

const Bookings = () => {
  const bookings = useBookingsStore((state) => state.bookings);
  const fetchBookings = useBookingsStore((state) => state.fetchBookings);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  return (
    <>
      <Subheader title="Bookings" />
      <div className=" m-2 mx-auto ">
        <div className="overflow-x-auto">
          <div className="min-w-full">
            <div className="flex mb-1 p-4 bg-slate-300">
              <h1 className="px-4 py-2 text-left">no.</h1>
              <h1 className="px-4 py-2 text-left">category</h1>
              <h1 className="px-4 py-2 text-left">descriptions</h1>
              <h1 className="px-4 py-2 text-left">price</h1>
              <h1 className="px-4 py-2 text-left">users/potential buyer</h1>
              <h1 className="px-4 py-2 text-left bg-amber-400">status</h1>
              <h1 className="px-4 py-2 text-left">comment</h1>
            </div>
            {bookings.map((books) => (
              <BookingsDisplayTable data={books} key={books.id} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Bookings;
