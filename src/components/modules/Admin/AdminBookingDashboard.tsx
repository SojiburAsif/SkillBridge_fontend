/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect, useMemo } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import {
    Calendar, Clock,
    LayoutGrid, List,
    ChevronLeft, ChevronRight, FilterX
} from "lucide-react";
import { Booking, BookingStatus, updateBookingStatus, getTutorProfile } from "@/services/AdminBooking.service";
import { Button } from "@/components/ui/button";
import { ClassValue } from "clsx";

interface SlotInfo {
    id: string;
    startTime: string;
    endTime: string;
}

interface TutorInfo {
    name?: string;
    user?: { name?: string };
    slots?: SlotInfo[];
}

type Props = {
    bookings: Booking[];
};

export default function AdminBookingDashboard({ bookings: initialBookings }: Props) {
    const [bookings, setBookings] = useState<Booking[]>(initialBookings);
    const [viewMode, setViewMode] = useState<"table" | "grid">("table");
    const [tutorData, setTutorData] = useState<Record<string, TutorInfo>>({});

    // Pagination States
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    useEffect(() => {
        const fetchAllNeededData = async () => {
            const uniqueTutorIds = Array.from(new Set(initialBookings.map(b => b.tutorId).filter(Boolean))) as string[];

            // Promise.all use korle sob fetch eksathe hobe, result fast paben
            const profiles = await Promise.all(
                uniqueTutorIds.map(async (id) => {
                    try {
                        const profile = await getTutorProfile(id);
                        return { id, profile };
                    } catch (e) {
                        return { id, profile: { name: "Unknown Tutor" } };
                    }
                })
            );

            const details: Record<string, TutorInfo> = {};
            profiles.forEach(({ id, profile }) => {
                details[id] = profile;
            });

            setTutorData(details);
        };

        if (initialBookings.length > 0) fetchAllNeededData();
    }, [initialBookings]);

    // Pagination Logic
    const totalPages = Math.ceil(bookings.length / itemsPerPage);
    const paginatedBookings = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return bookings.slice(start, start + itemsPerPage);
    }, [bookings, currentPage]);

    const getSlotTimeRange = (tutorId: string | null, slotId: string | null) => {
        if (!tutorId || !slotId || !tutorData[tutorId]?.slots) return "Time N/A";
        const slot = tutorData[tutorId].slots?.find(s => s.id === slotId);
        return slot ? `${slot.startTime} - ${slot.endTime}` : "Slot Expired";
    };

    const handleStatusChange = async (bookingId: string, newStatus: string) => {
        const previous = [...bookings];
        setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: newStatus as BookingStatus } : b));
        try {
            await updateBookingStatus(bookingId, newStatus);
            toast.success(`Booking status: ${newStatus}`);
        } catch (error) {
            setBookings(previous);
            toast.error("Failed to update status");
        }
    };

    const getStatusStyle = (status: string) => {
        switch (status) {
            case "CONFIRMED": return "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-900/50";
            case "CANCELLED": return "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-900/50";
            case "COMPLETED": return "bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-500/10 dark:text-sky-400 dark:border-sky-900/50";
            // ✅ Added New Status Styles
            case "ATTENDED": return "bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-500/10 dark:text-violet-400 dark:border-violet-900/50";
            case "RESCHEDULED": return "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-900/50";
            default: return "bg-slate-50 text-slate-700 border-slate-200 dark:bg-zinc-900 dark:text-zinc-400 dark:border-zinc-800";
        }
    };

    return (
        <div className="p-4 md:p-8 w-full min-h-screen bg-white dark:bg-black transition-colors duration-500">
            {/* Top Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div className="space-y-1 border-l-4 border-blue-600 pl-4">
                    <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white uppercase">
                        Admin <span className="text-blue-600">Bookings</span>
                    </h1>
                    <div className="flex items-center gap-2 text-slate-500 dark:text-zinc-400 text-sm font-medium">
                        <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
                        Live Booking Management System
                    </div>
                </div>

                <div className="flex items-center bg-slate-100 dark:bg-zinc-900 p-1.5 rounded-2xl border border-slate-200 dark:border-zinc-800">
                    <Button variant={viewMode === "table" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("table")} className={cn("rounded-xl transition-all", viewMode === "table" && "bg-blue-600 text-white shadow-lg")}>
                        <List size={18} className="mr-2" /> Table
                    </Button>
                    <Button variant={viewMode === "grid" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("grid")} className={cn("rounded-xl transition-all", viewMode === "grid" && "bg-blue-600 text-white shadow-lg")}>
                        <LayoutGrid size={18} className="mr-2" /> Cards
                    </Button>
                </div>
            </div>

            {/* Content Area */}
            <div className="min-h-[60vh]">
                {bookings.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-32 text-slate-400">
                        <FilterX size={64} strokeWidth={1} className="mb-4 opacity-20" />
                        <p className="uppercase tracking-[0.2em] font-black text-sm">No Bookings Found</p>
                    </div>
                ) : viewMode === "table" ? (
                    <div className="rounded-[2rem] border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden shadow-2xl shadow-blue-500/5">
                        <Table>
                            <TableHeader className="bg-slate-50 dark:bg-zinc-900/50">
                                <TableRow className="hover:bg-transparent border-b dark:border-zinc-800">
                                    <TableHead className="font-bold py-5 pl-8 text-[11px] uppercase tracking-widest text-slate-500">Schedule</TableHead>
                                    <TableHead className="font-bold text-[11px] uppercase tracking-widest text-slate-500">Identities</TableHead>
                                    <TableHead className="font-bold text-[11px] uppercase tracking-widest text-slate-500">Slot Details</TableHead>
                                    <TableHead className="font-bold text-center text-[11px] uppercase tracking-widest text-slate-500">Status</TableHead>
                                    <TableHead className="font-bold text-right pr-8 text-[11px] uppercase tracking-widest text-slate-500">Management</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {paginatedBookings.map((b) => (
                                    <TableRow key={b.id} className="hover:bg-blue-50/30 dark:hover:bg-zinc-900/30 transition-colors border-b dark:border-zinc-900">
                                        <TableCell className="pl-8 py-6">
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-500 font-black text-sm">
                                                    <Calendar size={14} /> {new Date(b.dateTime).toLocaleDateString()}
                                                </div>
                                                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
                                                    {new Date(b.dateTime).toLocaleTimeString()}
                                                </div>
                                            </div>
                                        </TableCell>

                                        <TableCell>
                                            <div className="flex flex-col gap-2">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-[10px] font-bold text-slate-400">S:</span>
                                                    <span className="text-xs font-mono font-bold dark:text-zinc-300">#{b.studentId?.slice(-6)}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-[10px] font-bold text-slate-400">T:</span>
                                                    <span className="text-xs font-bold dark:text-zinc-300 truncate max-w-[120px]">
                                                        {tutorData[b.tutorId!]?.name || "Loading..."}
                                                    </span>
                                                </div>
                                            </div>
                                        </TableCell>

                                        <TableCell>
                                            <div className="flex flex-col gap-1">
                                                <div className="text-xs font-black dark:text-zinc-200 flex items-center gap-1.5">
                                                    <Clock size={12} className="text-blue-500" />
                                                    {getSlotTimeRange(b.tutorId, b.slotId)}
                                                </div>
                                                <Badge variant="outline" className="w-fit text-[9px] dark:border-zinc-800 text-slate-400">
                                                    ID: {b.slotId?.slice(-6)}
                                                </Badge>
                                            </div>
                                        </TableCell>

                                        <TableCell className="text-center">
                                            <Badge className={cn("px-3 py-1 rounded-lg font-black text-[9px] tracking-widest border shadow-none uppercase", getStatusStyle(b.status))}>
                                                {b.status}
                                            </Badge>
                                        </TableCell>

                                        <TableCell className="text-right pr-8">
                                            <StatusSelector currentStatus={b.status} onUpdate={(val) => handleStatusChange(b.id, val)} />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {paginatedBookings.map((b) => (
                            <div key={b.id} className="group bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-900 rounded-[2rem] p-6 shadow-sm hover:shadow-xl transition-all">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="h-12 w-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                                        <Calendar size={20} />
                                    </div>
                                    <Badge className={cn("px-3 py-1 rounded-md font-black text-[10px]", getStatusStyle(b.status))}>{b.status}</Badge>
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-xl font-black dark:text-white">{new Date(b.dateTime).toLocaleDateString()}</h3>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="p-3 rounded-xl bg-slate-50 dark:bg-zinc-900 border dark:border-zinc-800">
                                            <p className="text-[9px] font-bold text-slate-400 uppercase">Tutor</p>
                                            <p className="text-xs font-black truncate">{tutorData[b.tutorId!]?.name || "..."}</p>
                                        </div>
                                        <div className="p-3 rounded-xl bg-slate-50 dark:bg-zinc-900 border dark:border-zinc-800">
                                            <p className="text-[9px] font-bold text-slate-400 uppercase">Slot</p>
                                            <p className="text-xs font-black">{getSlotTimeRange(b.tutorId, b.slotId).split(' ')[0]}</p>
                                        </div>
                                    </div>
                                    <StatusSelector currentStatus={b.status} onUpdate={(val) => handleStatusChange(b.id, val)} fullWidth />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Pagination Footer */}
            {totalPages > 1 && (
                <div className="mt-10 flex items-center justify-between bg-slate-100/50 dark:bg-zinc-900/50 p-6 rounded-[1.5rem] border border-slate-200 dark:border-zinc-900">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                        Page {currentPage} of {totalPages}
                    </p>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="icon"
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(p => p - 1)}
                            className="h-10 w-10 rounded-xl dark:bg-zinc-950 dark:border-zinc-800"
                        >
                            <ChevronLeft size={18} />
                        </Button>
                        <div className="flex gap-1">
                            {Array.from({ length: totalPages }).map((_, i) => (
                                <Button
                                    key={i}
                                    variant={currentPage === i + 1 ? "default" : "outline"}
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={cn("h-10 w-10 rounded-xl font-bold", currentPage === i + 1 ? "bg-blue-600 shadow-lg shadow-blue-500/20" : "dark:bg-zinc-950 dark:border-zinc-800")}
                                >
                                    {i + 1}
                                </Button>
                            ))}
                        </div>
                        <Button
                            variant="outline"
                            size="icon"
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(p => p + 1)}
                            className="h-10 w-10 rounded-xl dark:bg-zinc-950 dark:border-zinc-800"
                        >
                            <ChevronRight size={18} />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}

function StatusSelector({ currentStatus, onUpdate, fullWidth }: { currentStatus: string, onUpdate: (val: string) => void, fullWidth?: boolean }) {
    return (
        <Select value={currentStatus} onValueChange={onUpdate}>
            <SelectTrigger className={cn("h-10 font-black text-[10px] rounded-xl border-2 transition-all uppercase tracking-wider dark:bg-zinc-900 dark:border-zinc-800", fullWidth ? "w-full" : "w-36")}>
                <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-2 font-black dark:bg-zinc-950 dark:border-zinc-800">
                <SelectItem value="CONFIRMED" className="text-emerald-600 text-[10px]">CONFIRMED</SelectItem>
                <SelectItem value="ATTENDED" className="text-violet-600 text-[10px]">ATTENDED</SelectItem>
                <SelectItem value="RESCHEDULED" className="text-amber-600 text-[10px]">RESCHEDULED</SelectItem>
                <SelectItem value="CANCELLED" className="text-rose-600 text-[10px]">CANCELLED</SelectItem>
                <SelectItem value="COMPLETED" className="text-sky-600 text-[10px]">COMPLETED</SelectItem>
            </SelectContent>
        </Select>
    );
}

function cn(...inputs: ClassValue[]) {
    return inputs.filter(Boolean).join(" ");
}