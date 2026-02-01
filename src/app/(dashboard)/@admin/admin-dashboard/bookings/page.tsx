// @/services/booking.service থেকে ইমপোর্ট করা বাদ দিন যদি আপনি AdminBooking.service ব্যবহার করেন
import AdminBookingDashboard from "@/components/modules/Admin/AdminBookingDashboard";
import { getAllBookings, Booking } from "@/services/AdminBooking.service"; 

export default async function AdminBookingsPage() {
   
    const bookings: Booking[] = await getAllBookings();

    return <AdminBookingDashboard bookings={bookings} />;
}