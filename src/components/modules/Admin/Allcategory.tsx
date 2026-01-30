"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast, Toaster } from "sonner";
import { Category, createCategories } from "@/services/category.service";


type Props = {
  categories: Category[];
};

export default function AdminCategoryDashboard({ categories: initialCategories }: Props) {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [newCategory, setNewCategory] = useState("");

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return toast.error("Category name cannot be empty");

    try {
      const created = await createCategories([{ name: newCategory.trim() }]);
      setCategories(prev => [...prev, ...created]);
      setNewCategory("");
      toast.success("Category added successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add category");
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-black min-h-screen">
      <Toaster position="top-right" />
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Manage Categories</h1>

      <div className="flex mb-6 gap-2">
        <Input
          placeholder="New category name"
          value={newCategory}
          onChange={e => setNewCategory(e.target.value)}
          className="flex-1"
        />
        <Button onClick={handleAddCategory} className="bg-blue-600 text-white hover:bg-blue-700">
          Add Category
        </Button>
      </div>

      <Table className="bg-white dark:bg-gray-900 shadow rounded-lg overflow-hidden">
        <TableHeader className="bg-gray-100 dark:bg-gray-800">
          <TableRow>
            <TableHead className="text-gray-700 dark:text-gray-200">ID</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-200">Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.length === 0 ? (
            <TableRow>
              <TableCell colSpan={2} className="text-center py-4 text-gray-500 dark:text-gray-400">
                No categories found
              </TableCell>
            </TableRow>
          ) : (
            categories.map(cat => (
              <TableRow key={cat.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                <TableCell className="text-gray-900 dark:text-gray-100 w-24 truncate">
                  {cat.id.slice(0, 8)}...
                </TableCell>
                <TableCell className="text-gray-900 dark:text-gray-100">{cat.name}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
