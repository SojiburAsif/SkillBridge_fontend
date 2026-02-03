// app/admin/statistics/page.tsx
import StatsDashboard from "@/components/modules/Admin/StatisticsPage";
import { getAllUsers } from "@/services/Admin.service";
import { getAllBookings } from "@/services/AdminBooking.service";
import { getAllCategories } from "@/services/category.service";
import { getAllTutorProfiles } from "@/services/TutorProfile.service";


export default async function StatisticsPage() {
    // Parallel fetching for high performance
    const [users, bookings, categories, tutorsData] = await Promise.all([
        getAllUsers(),
        getAllBookings(),
        getAllCategories(),
       getAllTutorProfiles()
    ]);

    // API structure handle kora (data field thakle sheta neya)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tutors = Array.isArray(tutorsData) ? tutorsData : (tutorsData as any)?.data || [];

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Statistics Overview</h1>
            <StatsDashboard 
                users={users || []} 
                bookings={bookings || []} 
                categories={categories || []} 
                tutors={tutors}
            />
        </div>
    );
}