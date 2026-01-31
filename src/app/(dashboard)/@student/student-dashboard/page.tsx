"use client";

import { useEffect, useState } from "react";
import {
  Calendar, Clock, Mail, User, BookOpen,
  Video, Loader2, Search
} from "lucide-react";
import {
  Card, CardContent, CardHeader, CardTitle, CardDescription
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getMyBookings } from "@/services/booking.service";
import Link from "next/link";

export default function StudentDashboardPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getMyBookings();
        setBookings(data || []);
      } catch (error) {
        console.error("Booking Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[70vh] flex-col items-center justify-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
        <p className="text-sm font-black uppercase tracking-widest text-slate-400">Loading Your Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto p-4 md:p-8 space-y-8 animate-in fade-in duration-500">

      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white dark:bg-zinc-950 p-8 rounded-[32px] border border-slate-100 dark:border-zinc-900 shadow-sm">
        <div className="flex items-center gap-5">
          <div className="h-16 w-16 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-xl shadow-blue-500/20">
            <User size={32} />
          </div>
          <div>
            <h1 className="text-2xl font-black uppercase tracking-tight">Student <span className="text-blue-600">Dashboard</span></h1>
            <p className="text-sm text-muted-foreground font-medium italic">Manage your sessions and learning progress</p>
          </div>
        </div>
        <div>
          <Link href="/TutoreProfile">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold uppercase tracking-widest text-[10px] h-11 px-6 shadow-lg shadow-blue-500/20">
              New Booking
            </Button>
          </Link>
        </div>
      </div>

      {/* 2. Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-none shadow-xl shadow-slate-200/40 dark:shadow-none dark:bg-zinc-950 rounded-[28px]">
          <CardContent className="p-6 flex items-center gap-5">
            <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-500/10 text-blue-600"><Calendar size={24} /></div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[2px] text-slate-400">Total Bookings</p>
              <p className="text-2xl font-black mt-1">{bookings.length}</p>
            </div>
          </CardContent>
        </Card>
      </div>

     
    </div>
  );
}