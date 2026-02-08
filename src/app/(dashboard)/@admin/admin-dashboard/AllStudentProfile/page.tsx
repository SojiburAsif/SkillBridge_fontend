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
import { User, Mail, Phone, Calendar } from "lucide-react";
import { getAllStudentProfiles } from '@/services/Admin.service';

export default async function AllStudentProfilePage() {
    const students = await getAllStudentProfiles();

    return (
        <div className="p-6 lg:p-10 space-y-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Student Profiles</h1>
                <p className="text-muted-foreground">
                    Manage and view all registered student details here.
                </p>
            </div>

            <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
                <Table>
                    <TableHeader className="bg-slate-50 dark:bg-zinc-900/50">
                        <TableRow>
                            <TableHead className="w-[250px]">Student Info</TableHead>
                            <TableHead>Contact</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Joined Date</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {students.length > 0 ? (
                            students.map((student) => (
                                <TableRow key={student.id} className="hover:bg-slate-50/50 dark:hover:bg-zinc-900/20 transition-colors">
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <div className="h-9 w-9 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                                                <User size={18} />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-bold text-sm">{student.user?.name}</span>
                                                <span className="text-xs text-muted-foreground truncate max-w-[150px]">
                                                    ID: {student.id.slice(0, 8)}...
                                                </span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-center gap-2 text-sm">
                                                <Mail size={14} className="text-slate-400" />
                                                {student.user?.email}
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <Phone size={14} />
                                                {student.user?.phone || "N/A"}
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="capitalize">
                                            {student.user?.role}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge 
                                            className={cn(
                                                "font-medium",
                                                student.user?.status === "active" ? "bg-green-100 text-green-700 hover:bg-green-100" : "bg-yellow-100 text-yellow-700 hover:bg-yellow-100"
                                            )}
                                        >
                                            {student.user?.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <Calendar size={14} />
                                            {new Date(student.createdAt).toLocaleDateString()}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} className="h-24 text-center">
                                    No student profiles found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}


function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(" ");
}