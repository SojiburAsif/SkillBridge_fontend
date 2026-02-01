import { getTutorBookings } from "@/services/booking.service";
import { TutorBookingsCard } from "@/components/modules/Booking/TutorBookingsCard";

export default async function TutorBookingsPage() {
  const bookings = await getTutorBookings();

  return (
    <div className="min-h-screen bg-[#fcfcfd] dark:bg-black p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tighter text-slate-900 dark:text-white">
            Appointments
          </h1>
          <p className="text-sm text-slate-500 font-medium">Manage your student sessions and schedule.</p>
        </div>

        <TutorBookingsCard bookings={bookings as never} />
      </div>
    </div>
  );
}