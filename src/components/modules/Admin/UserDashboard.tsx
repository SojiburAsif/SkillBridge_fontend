"use client";

import { useState, useEffect } from "react";
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
import { User, updateUserStatus } from "@/services/AllUser.service";
import { toast } from "sonner";

type Props = {
    users: User[];
};

export default function AdminDashboard({ users: initialUsers }: Props) {
    // 🔹 Safety: always make sure we have an array
    const [users, setUsers] = useState<User[]>(Array.isArray(initialUsers) ? initialUsers : []);

    // Optional: log users to confirm data
    useEffect(() => {
        console.log("Users in dashboard:", users);
    }, [users]);

    const handleStatusChange = async (userId: string, newStatus: string) => {
        // Optimistic UI update
        setUsers(prev =>
            prev.map(u => (u.id === userId ? { ...u, status: newStatus } : u))
        );

        try {
            await updateUserStatus(userId, newStatus);
            toast.success(`Status updated to ${newStatus}`); // ✅ toast success
        } catch (err) {
            console.error("Status update failed", err);
            toast.error("Failed to update status"); // ✅ toast error
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">All Users</h1>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-24">ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {users.map(user => (
                        <TableRow key={user.id}>
                           
                            <TableCell className="w-24 truncate">{user.id.slice(0, 22)}...</TableCell>
                            <TableCell className="">{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.role}</TableCell>
                            <TableCell>
                                <Select
                                    value={user.status}
                                    onValueChange={val => handleStatusChange(user.id, val)}
                                >
                                    <SelectTrigger className="w-28">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="ACTIVE">ACTIVE</SelectItem>
                                        <SelectItem value="INACTIVE">INACTIVE</SelectItem>
                                    </SelectContent>
                                </Select>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
