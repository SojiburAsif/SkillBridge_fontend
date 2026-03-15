// app/admin/statistics/page.tsx
import StatsDashboard from "@/components/modules/Admin/StatisticsPage";
import { getDashboardAnalytics } from "@/services/Admin.service";


export default async function StatisticsPage() {
    const analytics = await getDashboardAnalytics();

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Statistics Overview</h1>
            <StatsDashboard analytics={analytics} />
        </div>
    );
}