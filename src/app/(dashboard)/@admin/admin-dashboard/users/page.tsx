import AdminDashboard from "@/components/modules/Admin/UserDashboard";
import { getAllUsers, User } from "@/services/AllUser.service";


export default async function AdminUsersPage() {
  const users: User[] = await getAllUsers(); // ✅ server fetch



  return <AdminDashboard users={users} />; // ✅ pass directly
}
