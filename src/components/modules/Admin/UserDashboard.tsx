"use client";

import { useState, useMemo } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User, updateUserStatus } from "@/services/Admin.service";
import { toast } from "sonner";
import { 
    ShieldCheck, User as UserIcon, Mail, Phone, Ban, 
    CheckCircle2, Clock, Search, ChevronLeft, ChevronRight,
    FilterX
} from "lucide-react";

type Props = {
    users: User[];
};

export default function AdminDashboard({ users: initialUsers }: Props) {
    const [users, setUsers] = useState<User[]>(Array.isArray(initialUsers) ? initialUsers : []);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 7;

    const filteredUsers = useMemo(() => {
        return users.filter(user => 
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [users, searchTerm]);

    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

    const handleStatusChange = async (userId: string, newStatus: string) => {
        const previousUsers = [...users];
        setUsers(prev =>
            prev.map(u => (u.id === userId ? { ...u, status: newStatus } : u))
        );

        try {
            await updateUserStatus(userId, newStatus);
            toast.success(`User is now ${newStatus}`);
        } catch (err) {
            setUsers(previousUsers);
            toast.error("Failed to update status");
        }
    };

    return (
        <div className="p-4 md:p-8 w-full max-w-[1400px] mx-auto space-y-6 animate-in fade-in duration-500 bg-white dark:bg-black min-h-screen text-slate-900 dark:text-slate-100 transition-colors">
            
            {/* Header & Search */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="flex flex-col gap-1 border-l-4 border-blue-600 pl-4">
                    <h1 className="text-3xl font-black tracking-tight uppercase">
                        User Control <span className="text-blue-600">Panel</span>
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                        SkillBridge Administration: Manage and monitor all registered users.
                    </p>
                </div>

                <div className="relative w-full md:w-80">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <Input 
                        placeholder="Search users..." 
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="pl-10 h-11 rounded-xl border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900 focus:ring-blue-600 dark:focus:ring-blue-500"
                    />
                </div>
            </div>

            {/* Main Table Container */}
            <div className="rounded-[20px] border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden shadow-xl dark:shadow-none transition-all">
                <Table className="w-full">
                    <TableHeader className="bg-slate-50 dark:bg-zinc-900/50">
                        <TableRow className="hover:bg-transparent border-b border-slate-200 dark:border-zinc-800 h-14">
                            <TableHead className="pl-8 uppercase text-[10px] font-bold tracking-widest text-slate-500 dark:text-zinc-400">Profile</TableHead>
                            <TableHead className="uppercase text-[10px] font-bold tracking-widest text-slate-500 dark:text-zinc-400">Contact</TableHead>
                            <TableHead className="uppercase text-[10px] font-bold tracking-widest text-slate-500 dark:text-zinc-400">Role</TableHead>
                            <TableHead className="pr-8 text-right uppercase text-[10px] font-bold tracking-widest text-slate-500 dark:text-zinc-400">Status</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {paginatedUsers.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center py-28 bg-white dark:bg-black">
                                    <div className="flex flex-col items-center gap-3 text-slate-400 dark:text-zinc-600">
                                        <FilterX size={48} strokeWidth={1} />
                                        <p className="font-bold uppercase text-[10px] tracking-widest">No users found</p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            paginatedUsers.map(user => (
                                <TableRow key={user.id} className="hover:bg-slate-50/50 dark:hover:bg-zinc-900/30 border-b border-slate-100 dark:border-zinc-900 transition-colors h-20">
                                    <TableCell className="pl-8">
                                        <div className="flex items-center gap-4">
                                            <div className="h-10 w-10 rounded-xl bg-blue-600 dark:bg-blue-700 flex items-center justify-center text-white font-bold text-sm">
                                                {user.name.charAt(0).toUpperCase()}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-bold text-sm dark:text-zinc-100">{user.name}</span>
                                                <span className="text-[10px] font-mono text-slate-400 dark:text-zinc-500 uppercase tracking-tighter mt-0.5">
                                                    ID: {user.id.slice(-8).toUpperCase()}
                                                </span>
                                            </div>
                                        </div>
                                    </TableCell>

                                    <TableCell>
                                        <div className="flex flex-col gap-1 text-xs">
                                            <div className="flex items-center gap-2 font-medium">
                                                <Mail size={12} className="text-blue-500" />
                                                {user.email}
                                            </div>
                                            <div className="flex items-center gap-2 text-slate-400 dark:text-zinc-500">
                                                <Phone size={12} />
                                                {user.phone || "N/A"}
                                            </div>
                                        </div>
                                    </TableCell>

                                    <TableCell>
                                        <Badge 
                                            className={cn(
                                                "px-2.5 py-0.5 rounded-md text-[9px] font-black uppercase border transition-all",
                                                user.role === "ADMIN" 
                                                ? "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/10 dark:text-purple-400 dark:border-purple-800" 
                                                : "bg-slate-50 text-slate-600 border-slate-200 dark:bg-zinc-900 dark:text-zinc-400 dark:border-zinc-800"
                                            )}
                                        >
                                            {user.role}
                                        </Badge>
                                    </TableCell>

                                    <TableCell className="text-right pr-8">
                                        <div className="flex justify-end">
                                            <Select
                                                value={user.status}
                                                onValueChange={val => handleStatusChange(user.id, val)}
                                            >
                                                <SelectTrigger className={cn(
                                                    "w-[125px] font-bold text-[10px] h-9 rounded-lg px-3 border-2 transition-all uppercase",
                                                    user.status === "ACTIVE" && "border-green-100 dark:border-green-900/50 text-green-600 bg-green-50 dark:bg-green-950/20",
                                                    user.status === "INACTIVE" && "border-amber-100 dark:border-amber-900/50 text-amber-600 bg-amber-50 dark:bg-amber-950/20",
                                                    user.status === "BAND" && "border-red-100 dark:border-red-900/50 text-red-600 bg-red-50 dark:bg-red-950/20"
                                                )}>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent className="dark:bg-zinc-950 dark:border-zinc-800">
                                                    <SelectItem value="ACTIVE" className="text-green-600 text-xs font-bold">ACTIVE</SelectItem>
                                                    <SelectItem value="INACTIVE" className="text-amber-600 text-xs font-bold">INACTIVE</SelectItem>
                                                    <SelectItem value="BAND" className="text-red-600 text-xs font-bold">BANNED</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>

                {/* Footer Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-between px-8 py-5 bg-slate-50/50 dark:bg-zinc-900/50 border-t border-slate-200 dark:border-zinc-900">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            {currentPage} / {totalPages} Pages
                        </span>
                        
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className="h-8 w-8 p-0 dark:bg-zinc-950 dark:border-zinc-800"
                            >
                                <ChevronLeft size={14} />
                            </Button>
                            
                            <div className="flex gap-1">
                                {[...Array(totalPages)].map((_, i) => (
                                    <Button
                                        key={i}
                                        variant={currentPage === i + 1 ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setCurrentPage(i + 1)}
                                        className={cn(
                                            "h-8 w-8 rounded-md text-[10px] font-bold transition-all",
                                            currentPage === i + 1 
                                            ? "bg-blue-600 dark:bg-blue-500 text-white border-transparent" 
                                            : "border-slate-200 dark:border-zinc-800 text-slate-400"
                                        )}
                                    >
                                        {i + 1}
                                    </Button>
                                ))}
                            </div>

                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className="h-8 w-8 p-0 dark:bg-zinc-950 dark:border-zinc-800"
                            >
                                <ChevronRight size={14} />
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

function cn(...inputs: (string | boolean | undefined)[]) {
    return inputs.filter(Boolean).join(" ");
}