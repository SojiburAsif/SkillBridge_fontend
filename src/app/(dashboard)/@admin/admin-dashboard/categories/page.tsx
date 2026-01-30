import AdminCategoryDashboard from "@/components/modules/Admin/Allcategory";
import { Category, getAllCategories } from "@/services/category.service";


export default async function AdminCategoriesPage() {
  const categories: Category[] = await getAllCategories();

  return <AdminCategoryDashboard categories={categories} />;
}
