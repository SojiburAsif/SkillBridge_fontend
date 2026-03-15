"use client";

import { useEffect, useMemo, useState } from "react";
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

    const [activeBookingIndex, setActiveBookingIndex] = useState(0);

    const bookingChartData = useMemo(
        () => [
            { month: "Confirmed", count: analytics.bookings.confirmed, color: "#2563eb" },
            { month: "Completed", count: analytics.bookings.completed, color: "#65a30d" },
            { month: "Cancelled", count: analytics.bookings.cancelled, color: "#ea580c" },
            { month: "Attended", count: analytics.bookings.attended, color: "#0f766e" },
            { month: "Rescheduled", count: analytics.bookings.rescheduled, color: "#4f46e5" },
        ],
        [
            analytics.bookings.confirmed,
            analytics.bookings.completed,
            analytics.bookings.cancelled,
            analytics.bookings.attended,
            analytics.bookings.rescheduled,
        ]
    );

    const bookingDetails = bookingChartData.map((item) => ({
        label: item.month,
        value: item.count,
        color: item.color,
    }));

    const safeTotalBookings = Math.max(analytics.bookings.total, 1);

    useEffect(() => {
        if (bookingChartData.length === 0) return;

        const interval = window.setInterval(() => {
            setActiveBookingIndex((prev) => (prev + 1) % bookingChartData.length);
        }, 1800);

        return () => window.clearInterval(interval);
    }, [bookingChartData.length]);

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

    const activeBooking = bookingChartData[activeBookingIndex];

    return (
        <div className="space-y-8 w-full animate-in fade-in duration-700">
            {/* Stat Cards Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, i) => (
                    <Card key={i} className="border-none shadow-xl rounded-[28px] dark:bg-zinc-950 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 animate-in slide-in-from-bottom-2" style={{ animationDelay: `${i * 35}ms` }}>
                        <CardContent className="p-6 flex items-center gap-5">
                            <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color} ring-1 ring-black/5 dark:ring-white/5`}>
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
                        <CardTitle className="text-xl font-black uppercase flex items-center justify-between">
                            <span>Booking Status</span>
                            <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300 animate-pulse">
                                Auto Focus: {activeBooking?.month ?? "Live"}
                            </span>
                        </CardTitle>
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
                                    isAnimationActive
                                    animationDuration={1200}
                                    animationEasing="ease-in-out"
                                    activeDot={{ r: 8, fill: "hsl(var(--chart-1))", strokeWidth: 0 }}
                                    dot={(props) => {
                                        const isActive = props.index === activeBookingIndex;

                                        return (
                                            <circle
                                                cx={props.cx}
                                                cy={props.cy}
                                                r={isActive ? 7 : 4}
                                                fill={isActive ? "#2563eb" : "hsl(var(--chart-1))"}
                                                className={isActive ? "animate-pulse" : ""}
                                            />
                                        );
                                    }}
                                />
                            </LineChart>
                        </ChartContainer>
                        <div className="mt-4 flex flex-wrap gap-2">
                            {bookingChartData.map((item, index) => (
                                <button
                                    key={item.month}
                                    type="button"
                                    onMouseEnter={() => setActiveBookingIndex(index)}
                                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${activeBookingIndex === index
                                            ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                                            : "bg-slate-100 text-slate-600 dark:bg-zinc-800 dark:text-zinc-300"
                                        }`}
                                >
                                    {item.month}: {item.count}
                                </button>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Radial Chart */}
                <Card className="lg:col-span-4 border-none shadow-xl rounded-[32px] dark:bg-zinc-950 flex flex-col">
                    <CardHeader className="items-center pb-0">
                        <CardTitle className="text-xl font-black uppercase">User Role Split</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 pb-0">
                        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
                            <RadialBarChart data={userSplitData} innerRadius={30} outerRadius={110} startAngle={90} endAngle={-270}>
                                <RadialBar dataKey="count" background cornerRadius={10} isAnimationActive animationDuration={1600} />
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
                        {bookingDetails.map((item, index) => {
                            const percent = Math.round((item.value / safeTotalBookings) * 100);
                            const isActive = activeBookingIndex === index;

                            return (
                                <div
                                    key={item.label}
                                    className={`rounded-2xl border p-4 transition-all duration-300 ${isActive
                                            ? "border-blue-500 bg-blue-50/80 dark:bg-blue-500/10 dark:border-blue-400 shadow-lg"
                                            : "border-slate-200 dark:border-zinc-800"
                                        }`}
                                >
                                    <p className="text-[11px] font-black uppercase tracking-wider text-slate-500">{item.label}</p>
                                    <p className="text-2xl font-black mt-2 text-slate-900 dark:text-white">{item.value}</p>
                                    <p className="text-xs font-bold mt-1" style={{ color: item.color }}>{percent}% of total</p>
                                </div>
                            );
                        })}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}