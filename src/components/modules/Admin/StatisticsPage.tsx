/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { TrendingUp, Users, GraduationCap, CalendarCheck, LayoutGrid } from "lucide-react";
import { PolarGrid, RadialBar, RadialBarChart, PolarAngleAxis, Radar, RadarChart, CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart";

// --- Charts Configuration ---
const radialConfig = {
    visitors: { label: "Visitors" },
    chrome: { label: "Chrome", color: "var(--chart-1)" },
    safari: { label: "Safari", color: "var(--chart-2)" },
} satisfies ChartConfig;

const radarConfig = {
    desktop: { label: "Desktop", color: "var(--chart-1)" },
    mobile: { label: "Mobile", color: "var(--chart-2)" },
} satisfies ChartConfig;

const lineConfig = {
    desktop: { label: "Desktop", color: "var(--chart-1)" },
} satisfies ChartConfig;

// --- Main Dashboard Component ---
export default function StatsDashboard({ users = [], bookings = [], categories = [] }: any) {
    // Tutors filter logic (assuming role property exists)
    const tutors = users.filter((u: any) => u.role === "TUTOR");

    const statCards = [
        { label: "Total Users", value: users.length, icon: Users, color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-500/10" },
        { label: "Total Tutors", value: tutors.length, icon: GraduationCap, color: "text-purple-600", bg: "bg-purple-50 dark:bg-purple-500/10" },
        { label: "Total Bookings", value: bookings.length, icon: CalendarCheck, color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
        { label: "Categories", value: categories.length, icon: LayoutGrid, color: "text-orange-600", bg: "bg-orange-50 dark:bg-orange-500/10" },
    ];

    return (
        <div className="space-y-8 w-full animate-in fade-in duration-700">
            {/* 1. Stat Cards Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, i) => (
                    <Card key={i} className="border-none shadow-xl shadow-slate-200/50 dark:shadow-none dark:bg-zinc-950 rounded-[28px] overflow-hidden">
                        <CardContent className="p-6 flex items-center gap-5">
                            <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color}`}>
                                <stat.icon size={28} />
                            </div>
                            <div>
                                <p className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-zinc-500">{stat.label}</p>
                                <p className="text-3xl font-black dark:text-white mt-1">{stat.value}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* 2. Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Line Chart - Step (Large) */}
                <Card className="lg:col-span-8 border-none shadow-xl shadow-slate-200/50 dark:shadow-none dark:bg-zinc-950 rounded-[32px]">
                    <CardHeader>
                        <CardTitle className="text-xl font-black uppercase tracking-tight">Booking Growth</CardTitle>
                        <CardDescription>Activity overview for the last 6 months</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={lineConfig} className="h-[300px] w-full">
                            <LineChart accessibilityLayer data={dummyLineData} margin={{ left: 12, right: 12 }}>
                                <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.1} />
                                <XAxis
                                    dataKey="month"
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={8}
                                    tickFormatter={(value) => value.slice(0, 3)}
                                />
                                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                                <Line dataKey="desktop" type="step" stroke="var(--chart-1)" strokeWidth={3} dot={{ fill: "var(--chart-1)" }} />
                            </LineChart>
                        </ChartContainer>
                    </CardContent>
                </Card>

                {/* Radial Chart (Small) */}
                <Card className="lg:col-span-4 border-none shadow-xl shadow-slate-200/50 dark:shadow-none dark:bg-zinc-950 rounded-[32px] flex flex-col">
                    <CardHeader className="items-center pb-0">
                        <CardTitle className="text-xl font-black uppercase tracking-tight">User Split</CardTitle>
                        <CardDescription>Student vs Tutors</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 pb-0">
                        <ChartContainer config={radialConfig} className="mx-auto aspect-square max-h-[250px]">
                            <RadialBarChart data={dummyRadialData} innerRadius={30} outerRadius={110}>
                                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel nameKey="browser" />} />
                                <PolarGrid gridType="circle" strokeOpacity={0.1} />
                                <RadialBar dataKey="visitors" background cornerRadius={10} />
                            </RadialBarChart>
                        </ChartContainer>
                    </CardContent>
                    <CardFooter className="flex-col gap-2 text-sm">
                        <div className="flex items-center gap-2 font-bold text-blue-600">
                            Trending up by 5.2% <TrendingUp className="h-4 w-4" />
                        </div>
                    </CardFooter>
                </Card>

                {/* Radar Chart (Full Width or Large) */}
                <Card className="lg:col-span-12 border-none shadow-xl shadow-slate-200/50 dark:shadow-none dark:bg-zinc-950 rounded-[32px]">
                    <CardHeader className="items-center">
                        <CardTitle className="text-xl font-black uppercase tracking-tight">Market Analysis</CardTitle>
                        <CardDescription>Desktop vs Mobile Visitor Engagement</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-0">
                        <ChartContainer config={radarConfig} className="mx-auto aspect-square max-h-[350px]">
                            <RadarChart data={dummyRadarData}>
                                <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
                                <PolarAngleAxis dataKey="month" />
                                <PolarGrid radialLines={false} />
                                <Radar dataKey="desktop" stroke="var(--chart-1)" strokeWidth={2} fill="var(--chart-1)" fillOpacity={0.1} />
                                <Radar dataKey="mobile" stroke="var(--chart-2)" strokeWidth={2} fill="var(--chart-2)" fillOpacity={0.1} />
                            </RadarChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

// --- Dummy Data for Visuals ---
const dummyLineData = [
    { month: "Jan", desktop: 186 }, { month: "Feb", desktop: 305 },
    { month: "Mar", desktop: 237 }, { month: "Apr", desktop: 173 },
    { month: "May", desktop: 209 }, { month: "Jun", desktop: 214 },
];

const dummyRadialData = [
    { browser: "chrome", visitors: 275, fill: "var(--chart-1)" },
    { browser: "safari", visitors: 200, fill: "var(--chart-2)" },
    { browser: "firefox", visitors: 187, fill: "var(--chart-3)" },
];

const dummyRadarData = [
    { month: "Jan", desktop: 186, mobile: 160 },
    { month: "Feb", desktop: 185, mobile: 170 },
    { month: "Mar", desktop: 207, mobile: 180 },
    { month: "Apr", desktop: 173, mobile: 160 },
    { month: "May", desktop: 160, mobile: 190 },
    { month: "Jun", desktop: 174, mobile: 204 },
];