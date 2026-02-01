"use client";

import { TrendingUp, Users, GraduationCap, CalendarCheck, LayoutGrid } from "lucide-react";
import { PolarGrid, RadialBar, RadialBarChart, CartesianGrid, Line, LineChart, XAxis, Radar, RadarChart, PolarAngleAxis } from "recharts";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";

// --- Fix: Types updated to match your Services exactly ---
interface User {
    id: string;
    role?: string; // string allow kora holo jate assignable hoy
    createdAt?: string;
}

interface Booking {
    id: string;
    createdAt?: string; 
}

interface Category {
    id?: string; // undefined allow kora holo match korar jonno
    name: string;
}

interface Tutor {
    id: string;
    categoryId?: string;
}

interface StatsDashboardProps {
    users: User[];
    bookings: Booking[];
    categories: Category[];
    tutors: Tutor[];
}

const chartConfig = {
    count: { label: "Total", color: "hsl(var(--chart-1))" },
} satisfies ChartConfig;

export default function StatsDashboard({ 
    users = [], 
    bookings = [], 
    categories = [], 
    tutors = [] 
}: StatsDashboardProps) {

    // --- Chart Data Logic Fix ---

    // 1. Line Chart: Booking Count Logic
    const bookingChartData = () => {
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
        return monthNames.map((month, index) => {
            const count = bookings.filter((b) => {
                if (!b.createdAt) return false;
                const date = new Date(b.createdAt);
                // Validation: date valid ki na check kora
                return !isNaN(date.getTime()) && date.getMonth() === index;
            }).length;
            return { month, count };
        });
    };

    // 2. Radial Chart: User vs Tutor Split
    const userSplitData = [
        { name: "Users", count: users.length, fill: "hsl(var(--chart-1))" },
        { name: "Tutors", count: tutors.length, fill: "hsl(var(--chart-2))" },
    ];

    // 3. Radar Chart: Tutors per Category
    const categoryRadarData = categories.slice(0, 6).map((cat) => ({
        category: cat.name,
        // Category ID undefined hote pare tai safety check
        count: tutors.filter(t => t.categoryId === cat.id && cat.id !== undefined).length
    }));

    const statCards = [
        { label: "Total Users", value: users.length, icon: Users, color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-500/10" },
        { label: "Total Tutors", value: tutors.length, icon: GraduationCap, color: "text-purple-600", bg: "bg-purple-50 dark:bg-purple-500/10" },
        { label: "Total Bookings", value: bookings.length, icon: CalendarCheck, color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
        { label: "Categories", value: categories.length, icon: LayoutGrid, color: "text-orange-600", bg: "bg-orange-50 dark:bg-orange-500/10" },
    ];

    return (
        <div className="space-y-8 w-full animate-in fade-in duration-700">
            {/* Stat Cards Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, i) => (
                    <Card key={i} className="border-none shadow-xl rounded-[28px] dark:bg-zinc-950">
                        <CardContent className="p-6 flex items-center gap-5">
                            <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color}`}>
                                <stat.icon size={28} />
                            </div>
                            <div>
                                <p className="text-xs font-black uppercase text-slate-400">{stat.label}</p>
                                <p className="text-3xl font-black mt-1">{stat.value}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Line Chart */}
                <Card className="lg:col-span-8 border-none shadow-xl rounded-[32px] dark:bg-zinc-950">
                    <CardHeader>
                        <CardTitle className="text-xl font-black uppercase">Booking Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={chartConfig} className="h-[300px] w-full">
                            <LineChart data={bookingChartData()} margin={{ left: 10, right: 10 }}>
                                <CartesianGrid vertical={false} opacity={0.1} />
                                <XAxis dataKey="month" tickLine={false} axisLine={false} />
                                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                                <Line 
                                    dataKey="count" 
                                    type="monotone" 
                                    stroke="hsl(var(--chart-1))" 
                                    strokeWidth={4} 
                                    dot={{ r: 4, fill: "hsl(var(--chart-1))" }} 
                                />
                            </LineChart>
                        </ChartContainer>
                    </CardContent>
                </Card>

                {/* Radial Chart */}
                <Card className="lg:col-span-4 border-none shadow-xl rounded-[32px] dark:bg-zinc-950 flex flex-col">
                    <CardHeader className="items-center pb-0">
                        <CardTitle className="text-xl font-black uppercase">User Split</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 pb-0">
                        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
                            <RadialBarChart data={userSplitData} innerRadius={30} outerRadius={110}>
                                <RadialBar dataKey="count" background cornerRadius={10} />
                                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                            </RadialBarChart>
                        </ChartContainer>
                    </CardContent>
                    <CardFooter className="flex-col gap-2 text-sm font-bold text-blue-600">
                        <div className="flex items-center gap-2">LIVE SYNC ACTIVE <TrendingUp className="h-4 w-4" /></div>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}