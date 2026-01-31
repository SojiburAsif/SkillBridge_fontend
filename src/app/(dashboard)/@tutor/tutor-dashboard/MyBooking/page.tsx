import { getTutorBookings } from "@/services/booking.service";
import { TutorBookingsCard } from "@/components/modules/Booking/TutorBookingsCard";

export default async function TutorBookingsPage() {
  const bookings = await getTutorBookings();

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-black p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          My Students&apos; Bookings
        </h1>
        <TutorBookingsCard bookings={bookings} />
      </div>
    </div>
  );
}
