import AdminBookingDashboard from "@/components/modules/Admin/AdminBookingDashboard";
import { Booking, getAllBookings } from "@/services/booking.service";


export default async function AdminBookingsPage() {
  const bookings: Booking[] = await getAllBookings();

  return <AdminBookingDashboard bookings={bookings} />;
}
