import { useEffect } from "react";
import { useBookingsStore } from "../../store/useBookingsStore/useBookingsStore";
import Subheader from "../../ui/Subheader";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
const BookingDetails = () => {
  const getBookingsDetail = useBookingsStore(
    (state) => state.getBookingsDetail,
  );

  const { bookingDetail } = useBookingsStore();
  const { id } = useParams();
  const navigate = useNavigate();

  console.log("bookingsDetail:", bookingDetail);

  useEffect(() => {
    if (id) {
      const numericId = Number(id);
      if (!isNaN(numericId)) {
        getBookingsDetail(numericId);
      }
    }
  }, [id, getBookingsDetail]);

  if (!bookingDetail) return <div>No booking found</div>;
  const { created_at, species, users, status, comment } = bookingDetail;

  return (
    <>
      <div className="flex justify-between">
        <Subheader title="Bookings Detail" />
        <button
          className="flex items-center mx-4 text-blue-500"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeftLong /> <span className="px-2">BACK</span>
        </button>
      </div>
      <div>category:{created_at}</div>

      <div>category:{comment}</div>
      <div>category:{species?.category}</div>
      <div>category:{species?.price?.toLocaleString()}</div>
      <p>
        <strong>Guest:</strong>{" "}
        {users
          ? `${users?.firstName ?? ""} ${users?.lastName ?? ""}`
          : "No guest assigned"}
      </p>
      <div>category:{status}</div>
    </>
  );
};

export default BookingDetails;
