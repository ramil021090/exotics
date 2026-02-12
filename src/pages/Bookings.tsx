import { useEffect } from "react";
import { useBookingsStore } from "../store/useBookingsStore/useBookingsStore";
import Subheader from "../ui/Subheader";

const Bookings = () => {
  const bookings = useBookingsStore((state) => state.bookings);
  const fetchBookings = useBookingsStore((state) => state.fetchBookings);
  console.log("bookings:", bookings);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);
  //hello there
  return (
    <>
      <Subheader title="Bookings" />
      <div className=" m-2 ">
        <div className="flex justify-between mb-1 p-4 bg-slate-500">
          <h1>category</h1>
          <h1>descriptions</h1>
          <h1>comment</h1>
        </div>
        {/* {bookings.map((books) => (
          <div
            key={books.id}
            className="flex justify-between bg-slate-400 border px-4 mb-0.5"
          >
            <h1 className=" flex text-right ">{books.category}</h1>
            <h1 className=" flex text-right">{books.descriptions}</h1>
            <h1 className=" flex text-right">{books.comment}</h1>
          </div>
        ))} */}
      </div>
    </>
  );
};

export default Bookings;
