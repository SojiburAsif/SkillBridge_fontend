/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
    User, 
    Mail, 
    Phone, 
    Calendar, 
    GraduationCap, 
    Hash, 
    Activity 
} from "lucide-react";
import { getAllStudentProfiles } from '@/services/Admin.service';
import { cn } from "@/lib/utils"; // আপনার utils থেকে cn ইম্পোর্ট করুন

export default async function AllStudentProfilePage() {
    const students = await getAllStudentProfiles();

    return (
        <div className="p-6 lg:p-10 space-y-8 bg-slate-50/30 dark:bg-zinc-950/30 min-h-screen">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
                        <GraduationCap className="text-blue-600 h-8 w-8" />
                        Student Profiles
                    </h1>
                    <p className="text-slate-500 dark:text-zinc-400 text-sm md:text-base">
                        Efficiently manage and monitor all registered students.
                    </p>
                </div>
                
                <div className="flex items-center gap-3 bg-white dark:bg-zinc-900 p-2 rounded-lg border shadow-sm">
                    <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                        <User size={20} />
                    </div>
                    <div className="pr-4">
                        <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Total Students</p>
                        <p className="text-xl font-bold text-slate-900 dark:text-white">{students.length}</p>
                    </div>
                </div>
            </div>

            {/* Table Card */}
            <div className="rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xl shadow-blue-500/5 overflow-hidden">
                <Table>
                    <TableHeader className="bg-slate-50/50 dark:bg-zinc-800/50 border-b dark:border-zinc-800">
                        <TableRow>
                            <TableHead className="py-4 font-bold text-slate-700 dark:text-zinc-300">Student Info</TableHead>
                            <TableHead className="py-4 font-bold text-slate-700 dark:text-zinc-300">Contact Details</TableHead>
                            <TableHead className="py-4 font-bold text-slate-700 dark:text-zinc-300">Academic Role</TableHead>
                            <TableHead className="py-4 font-bold text-slate-700 dark:text-zinc-300">Status</TableHead>
                            <TableHead className="py-4 font-bold text-slate-700 dark:text-zinc-300 text-right">Joined Date</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {students.length > 0 ? (
                            students.map((student) => (
                                <TableRow 
                                    key={student.id} 
                                    className="group hover:bg-blue-50/30 dark:hover:bg-blue-900/5 transition-all duration-200 border-b dark:border-zinc-800"
                                >
                                    {/* Student Info */}
                                    <TableCell className="py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="relative h-11 w-11 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
                                                {student.user?.name?.[0] || <User size={20} />}
                                            </div>
                                            <div className="flex flex-col space-y-0.5">
                                                <span className="font-bold text-slate-900 dark:text-zinc-100 group-hover:text-blue-600 transition-colors">
                                                    {student.user?.name}
                                                </span>
                                                <div className="flex items-center gap-1.5 text-xs font-mono text-slate-500 dark:text-zinc-500">
                                                    <Hash size={12} className="text-blue-500" />
                                                    {student.id.slice(0, 12).toUpperCase()}
                                                </div>
                                            </div>
                                        </div>
                                    </TableCell>

                                    {/* Contact */}
                                    <TableCell>
                                        <div className="flex flex-col gap-1.5">
                                            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-zinc-300">
                                                <Mail size={14} className="text-blue-500/70" />
                                                {student.user?.email}
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-zinc-400">
                                                <Phone size={14} className="text-blue-500/70" />
                                                {student.user?.phone || "+880 1XXX-XXXXXX"}
                                            </div>
                                        </div>
                                    </TableCell>

                                    {/* Role */}
                                    <TableCell>
                                        <Badge 
                                            variant="secondary" 
                                            className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 border-blue-100 dark:border-blue-800 capitalize font-semibold px-3 py-1"
                                        >
                                            {student.user?.role}
                                        </Badge>
                                    </TableCell>

                                    {/* Status */}
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Activity size={14} className={student.user?.status === "active" ? "text-green-500" : "text-amber-500"} />
                                            <span className={cn(
                                                "text-sm font-bold capitalize",
                                                student.user?.status === "active" ? "text-green-600 dark:text-green-400" : "text-amber-600 dark:text-amber-400"
                                            )}>
                                                {student.user?.status}
                                            </span>
                                        </div>
                                    </TableCell>

                                    {/* Date */}
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-2 text-sm font-medium text-slate-600 dark:text-zinc-400">
                                            <Calendar size={14} className="text-blue-500" />
                                            {new Date(student.createdAt).toLocaleDateString('en-GB', {
                                                day: 'numeric',
                                                month: 'short',
                                                year: 'numeric'
                                            })}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} className="h-60 text-center">
                                    <div className="flex flex-col items-center justify-center space-y-3">
                                        <div className="p-4 bg-slate-100 dark:bg-zinc-800 rounded-full">
                                            <User size={40} className="text-slate-400" />
                                        </div>
                                        <p className="text-slate-500 dark:text-zinc-400 font-medium italic">
                                            No student profiles found.
                                        </p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}