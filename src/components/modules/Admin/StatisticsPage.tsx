"use client";

import { TrendingUp, Users, GraduationCap, CalendarCheck, LayoutGrid, UserCheck, UserX, Ban, BookOpen, Clock3, ClipboardCheck, RotateCcw } from "lucide-react";
import { RadialBar, RadialBarChart, CartesianGrid, Line, LineChart, XAxis } from "recharts";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import type { DashboardAnalytics } from "@/services/Admin.service";

interface StatsDashboardProps {
    analytics: DashboardAnalytics;
}

const chartConfig = {
    count: { label: "Total", color: "hsl(var(--chart-1))" },
} satisfies ChartConfig;

export default function StatsDashboard({ 
    analytics
}: StatsDashboardProps) {

    const bookingChartData = [
        { month: "Confirmed", count: analytics.bookings.confirmed },
        { month: "Completed", count: analytics.bookings.completed },
        { month: "Cancelled", count: analytics.bookings.cancelled },
        { month: "Attended", count: analytics.bookings.attended },
        { month: "Rescheduled", count: analytics.bookings.rescheduled },
    ];

    const bookingDetails = [
        { label: "Confirmed", value: analytics.bookings.confirmed },
        { label: "Completed", value: analytics.bookings.completed },
        { label: "Cancelled", value: analytics.bookings.cancelled },
        { label: "Attended", value: analytics.bookings.attended },
        { label: "Rescheduled", value: analytics.bookings.rescheduled },
    ];

    const safeTotalBookings = Math.max(analytics.bookings.total, 1);

    const userSplitData = [
        { name: "Students", count: analytics.users.byRole.students, fill: "hsl(var(--chart-1))" },
        { name: "Tutors", count: analytics.users.byRole.tutors, fill: "hsl(var(--chart-2))" },
        { name: "Admins", count: analytics.users.byRole.admins, fill: "hsl(var(--chart-3))" },
    ];

    const statCards = [
        { label: "Total Users", value: analytics.users.total, icon: Users, color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-500/10" },
        { label: "Students", value: analytics.users.byRole.students, icon: GraduationCap, color: "text-indigo-600", bg: "bg-indigo-50 dark:bg-indigo-500/10" },
        { label: "Tutors", value: analytics.users.byRole.tutors, icon: UserCheck, color: "text-violet-600", bg: "bg-violet-50 dark:bg-violet-500/10" },
        { label: "Admins", value: analytics.users.byRole.admins, icon: Ban, color: "text-fuchsia-600", bg: "bg-fuchsia-50 dark:bg-fuchsia-500/10" },
        { label: "Active Users", value: analytics.users.byStatus.active, icon: UserCheck, color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
        { label: "Inactive Users", value: analytics.users.byStatus.inactive, icon: UserX, color: "text-amber-600", bg: "bg-amber-50 dark:bg-amber-500/10" },
        { label: "Banned Users", value: analytics.users.byStatus.band, icon: Ban, color: "text-rose-600", bg: "bg-rose-50 dark:bg-rose-500/10" },
        { label: "Student Profiles", value: analytics.profiles.students, icon: BookOpen, color: "text-cyan-600", bg: "bg-cyan-50 dark:bg-cyan-500/10" },
        { label: "Tutor Profiles", value: analytics.profiles.tutors, icon: Users, color: "text-sky-600", bg: "bg-sky-50 dark:bg-sky-500/10" },
        { label: "Total Bookings", value: analytics.bookings.total, icon: CalendarCheck, color: "text-green-600", bg: "bg-green-50 dark:bg-green-500/10" },
        { label: "Confirmed", value: analytics.bookings.confirmed, icon: ClipboardCheck, color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-500/10" },
        { label: "Completed", value: analytics.bookings.completed, icon: CalendarCheck, color: "text-lime-600", bg: "bg-lime-50 dark:bg-lime-500/10" },
        { label: "Cancelled", value: analytics.bookings.cancelled, icon: UserX, color: "text-orange-600", bg: "bg-orange-50 dark:bg-orange-500/10" },
        { label: "Attended", value: analytics.bookings.attended, icon: UserCheck, color: "text-emerald-700", bg: "bg-emerald-100 dark:bg-emerald-600/20" },
        { label: "Rescheduled", value: analytics.bookings.rescheduled, icon: RotateCcw, color: "text-indigo-700", bg: "bg-indigo-100 dark:bg-indigo-600/20" },
        { label: "Reviews", value: analytics.reviews.total, icon: TrendingUp, color: "text-pink-600", bg: "bg-pink-50 dark:bg-pink-500/10" },
        { label: "Categories", value: analytics.categories.total, icon: LayoutGrid, color: "text-yellow-600", bg: "bg-yellow-50 dark:bg-yellow-500/10" },
        { label: "Total Slots", value: analytics.tutorSlots.total, icon: Clock3, color: "text-teal-600", bg: "bg-teal-50 dark:bg-teal-500/10" },
        { label: "Booked Slots", value: analytics.tutorSlots.booked, icon: Clock3, color: "text-blue-700", bg: "bg-blue-100 dark:bg-blue-600/20" },
        { label: "Available Slots", value: analytics.tutorSlots.available, icon: Clock3, color: "text-emerald-700", bg: "bg-emerald-100 dark:bg-emerald-600/20" },
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
                        <CardTitle className="text-xl font-black uppercase">Booking Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={chartConfig} className="h-[300px] w-full">
                            <LineChart data={bookingChartData} margin={{ left: 10, right: 10 }}>
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
                        <CardTitle className="text-xl font-black uppercase">User Role Split</CardTitle>
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

                <Card className="lg:col-span-12 border-none shadow-xl rounded-[32px] dark:bg-zinc-950">
                    <CardHeader>
                        <CardTitle className="text-xl font-black uppercase">Booking Details</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                        {bookingDetails.map((item) => {
                            const percent = Math.round((item.value / safeTotalBookings) * 100);

                            return (
                                <div key={item.label} className="rounded-2xl border border-slate-200 dark:border-zinc-800 p-4">
                                    <p className="text-[11px] font-black uppercase tracking-wider text-slate-500">{item.label}</p>
                                    <p className="text-2xl font-black mt-2 text-slate-900 dark:text-white">{item.value}</p>
                                    <p className="text-xs font-bold mt-1 text-blue-600">{percent}% of total</p>
                                </div>
                            );
                        })}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}