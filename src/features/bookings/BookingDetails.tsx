import { useEffect } from "react";
import { useBookingsStore } from "../../store/useBookingsStore/useBookingsStore";
import Subheader from "../../ui/Subheader";
import { useParams } from "react-router-dom";
const BookingDetails = () => {
  const { bookingDetail, getBookingsDetail } = useBookingsStore();

  console.log("bookingsDetail:", bookingDetail?.species);
  console.log("users:", bookingDetail?.users);

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const numericId = Number(id);
      if (!isNaN(numericId)) {
        getBookingsDetail(numericId);
      }
    }
  }, [id, getBookingsDetail]);

  if (!bookingDetail) return <div>No booking found</div>;
  return (
    <>
      <Subheader title="Bookings Detail" />
      <div>category:{bookingDetail?.comment}</div>
      <div>category:{bookingDetail?.species?.category}</div>
      <div>category:{bookingDetail?.species?.price.toLocaleString()}</div>
    </>
  );
};

export default BookingDetails;
