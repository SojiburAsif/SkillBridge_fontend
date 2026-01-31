"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { Category, createCategory } from "@/services/category.service";
import { Plus, Tag, Hash, Loader2, LayoutGrid } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

type Props = {
  categories: Category[];
};

export default function AdminCategoryDashboard({ categories: initialCategories }: Props) {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [newCategory, setNewCategory] = useState("");
  const [isPending, setIsPending] = useState(false);

  const handleAddCategory = async () => {
    const trimmedName = newCategory.trim();
    if (!trimmedName) return toast.error("Please enter a category name");

    setIsPending(true);
    const toastId = toast.loading("Adding category...");

    try {
      const created = await createCategory(trimmedName);
      
      // এখানে নিশ্চিত করুন API থেকে আসা 'created' অবজেক্টে 'id' এবং 'name' আছে
      if (created) {
        // নতুন ক্যাটাগরিকে লিস্টের শুরুতে যোগ করা হচ্ছে
        setCategories((prev) => [created, ...prev]);
        setNewCategory("");
        toast.success("Category created successfully", { id: toastId });
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to add category", { id: toastId });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="w-full min-h-screen p-4 md:p-10 space-y-8 animate-in fade-in duration-500 bg-white dark:bg-black">
      {/* Header Section */}
      <div className="flex flex-col gap-2 max-w-[1600px] mx-auto w-full">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600 rounded-xl text-white shadow-lg shadow-blue-500/20">
            <LayoutGrid size={24} />
          </div>
          <h1 className="text-3xl font-black tracking-tight dark:text-white uppercase">
            Manage Categories
          </h1>
        </div>
        <p className="text-muted-foreground text-sm font-medium">Create and manage your platform&apos;s tutoring topics.</p>
      </div>

      {/* Input Section - Full Width */}
      <Card className="w-full max-w-[1600px] mx-auto border-none shadow-xl shadow-slate-200/50 dark:shadow-none dark:bg-zinc-950 rounded-[28px] overflow-hidden border dark:border-zinc-900">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
              <Input
                placeholder="Ex: Computer Science, Mathematics, Physics..."
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="pl-10 h-14 rounded-2xl border-slate-200 dark:border-zinc-800 focus-visible:ring-blue-500 text-base"
                onKeyDown={(e) => e.key === "Enter" && handleAddCategory()}
              />
            </div>
            <Button 
              disabled={isPending}
              onClick={handleAddCategory} 
              className="h-14 px-10 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all shadow-lg shadow-blue-500/25 active:scale-95"
            >
              {isPending ? (
                <Loader2 className="animate-spin mr-2" size={20} />
              ) : (
                <Plus className="mr-2" size={20} />
              )}
              ADD NEW CATEGORY
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Table Section - Full Width */}
      <Card className="w-full max-w-[1600px] mx-auto border-none shadow-xl shadow-slate-200/50 dark:shadow-none dark:bg-zinc-950 rounded-[32px] overflow-hidden border dark:border-zinc-900">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50/50 dark:bg-zinc-900/50">
              <TableRow className="border-none hover:bg-transparent h-16">
                <TableHead className="w-32 font-black uppercase text-[11px] tracking-widest pl-10"># ID (Last 6)</TableHead>
                <TableHead className="font-black uppercase text-[11px] tracking-widest">Category Name</TableHead>
                <TableHead className="text-right pr-10 font-black uppercase text-[11px] tracking-widest">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="h-60 text-center">
                    <div className="flex flex-col items-center justify-center text-muted-foreground">
                      <Hash size={48} className="mb-4 opacity-10" />
                      <p className="font-bold uppercase text-sm tracking-[3px]">No categories found</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                categories.map((cat, index) => (
                  <TableRow
                    key={cat.id || index}
                    className="group border-slate-50 dark:border-zinc-900 hover:bg-slate-50/50 dark:hover:bg-zinc-900/30 transition-all h-16"
                  >
                    <TableCell className="pl-10 font-mono text-xs text-muted-foreground/60">
                      {cat.id ? cat.id.slice(-6).toUpperCase() : "PENDING"}
                    </TableCell>
                    <TableCell>
                      <span className="font-bold text-slate-800 dark:text-zinc-200 uppercase text-sm tracking-tight group-hover:text-blue-600 transition-colors">
                        {cat.name}
                      </span>
                    </TableCell>
                    <TableCell className="text-right pr-10">
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-50 dark:bg-green-500/10 text-green-600 text-[10px] font-black uppercase tracking-widest border border-green-100 dark:border-green-500/20">
                        Active
                      </span>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}