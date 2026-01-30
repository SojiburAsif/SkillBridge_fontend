"use client";

import { Booking, updateBookingStatus } from "@/services/booking.service";
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type Props = {
    bookings: Booking[];
};

export default function AdminBookingDashboard({ bookings: initialBookings }: Props) {
    const [bookings, setBookings] = useState<Booking[]>(() =>
        Array.isArray(initialBookings) ? initialBookings : []
    );

    const handleStatusChange = async (bookingId: string, newStatus: string) => {
        // Optimistic UI update
        setBookings(prev =>
            prev.map(b => (b.id === bookingId ? { ...b, status: newStatus } : b))
        );

        try {
            const updatedBooking = await updateBookingStatus(bookingId, newStatus);

            if (!updatedBooking) {
                // Revert change on failure
                setBookings(prev =>
                    prev.map(b => (b.id === bookingId ? { ...b, status: b.status } : b))
                );
                toast.error("Failed to update booking status");
                return;
            }

            toast.success(`Booking status updated to ${newStatus}`);
        } catch (error) {
            console.error("Error updating booking status:", error);
            setBookings(prev =>
                prev.map(b => (b.id === bookingId ? { ...b, status: b.status } : b))
            );
            toast.error("Error updating booking status");
        }
    };
    return (
        <div className="p-6 bg-white dark:bg-black min-h-screen">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">All Bookings</h1>
                
            </div>

            <Table className="bg-white dark:bg-black shadow  overflow-hidden">
                <TableHeader className="bg-gray-100 dark:bg-gray-800">
                    <TableRow>
                        <TableHead className="w-[80px] text-gray-700 dark:text-gray-200">ID</TableHead>
                        <TableHead className="text-gray-700 dark:text-gray-200">Date & Time</TableHead>
                        <TableHead className="text-gray-700 dark:text-gray-200">Status</TableHead>
                        <TableHead className="text-gray-700 dark:text-gray-200">Student</TableHead>
                        <TableHead className="text-gray-700 dark:text-gray-200">Tutor</TableHead>
                        <TableHead className="text-gray-700 dark:text-gray-200">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {bookings.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center py-4 text-gray-500 dark:text-gray-400">
                                No bookings found
                            </TableCell>
                        </TableRow>
                    ) : (
                        bookings.map(b => (
                            <TableRow key={b.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                                <TableCell className="font-medium text-gray-900 dark:text-gray-100">{b.id.slice(0, 8)}...</TableCell>
                                <TableCell className="text-gray-900 dark:text-gray-100">{new Date(b.dateTime).toLocaleString()}</TableCell>
                                <TableCell>
                                    <Badge
                                        className={`${b.status === "PENDING"
                                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                                            : b.status === "CONFIRMED"
                                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                                            }`}
                                    >
                                        {b.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-gray-900 dark:text-gray-100">{b.studentId}</TableCell>
                                <TableCell className="text-gray-900 dark:text-gray-100">{b.tutorId}</TableCell>
                                <TableCell>
                                    <Select
                                        value={b.status}
                                        onValueChange={val => handleStatusChange(b.id, val)}
                                    >
                                        <SelectTrigger className="w-32">
                                            <SelectValue placeholder={b.status} />
                                        </SelectTrigger>
                                        <SelectContent>
            
                                            <SelectItem value="CONFIRMED">CONFIRMED</SelectItem>
                                            <SelectItem value="CANCELLED">CANCELLED</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
