import StatsDashboard from "@/components/modules/Admin/StatisticsPage";
import { getAllUsers } from "@/services/AllUser.service";
import { getAllBookings } from "@/services/booking.service";
import { getAllCategories } from "@/services/category.service";



export default async function StatisticsPage() {
    const users = await getAllUsers();
    //   const tutors = await getAllTutors();
    const bookings = await getAllBookings();
    const categories = await getAllCategories();

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Statistics Overview</h1>
            <StatsDashboard users={users} bookings={bookings} categories={categories} />
        </div>
    );
}
