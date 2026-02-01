import AdminDashboard from "@/components/modules/Admin/UserDashboard";
import { getAllUsers, User } from "@/services/Admin.service";



export default async function AdminUsersPage() {
  const users: User[] = await getAllUsers(); 



  return <AdminDashboard users={users} />; 
}
