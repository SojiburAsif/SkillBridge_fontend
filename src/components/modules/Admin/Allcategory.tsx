"use client";

import { useState, useMemo } from "react";
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
import { 
  Plus, Tag, Hash, Loader2, LayoutGrid, 
  ChevronLeft, ChevronRight, Search, ListFilter 
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

type Props = {
  categories: Category[];
};

export default function AdminCategoryDashboard({ categories: initialCategories }: Props) {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [newCategory, setNewCategory] = useState("");
  const [isPending, setIsPending] = useState(false);
  
  // Pagination & Search States
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // প্রতি পেজে কয়টি ক্যাটাগরি দেখাবে

  // Filtered categories based on search
  const filteredCategories = useMemo(() => {
    return categories.filter(cat => 
      cat.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [categories, searchQuery]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCategories = filteredCategories.slice(startIndex, startIndex + itemsPerPage);

  const handleAddCategory = async () => {
    const trimmedName = newCategory.trim();
    if (!trimmedName) return toast.error("Please enter a category name");

    setIsPending(true);
    const toastId = toast.loading("Adding to database...");

    try {
      const created = await createCategory(trimmedName);
      if (created) {
        setCategories((prev) => [created, ...prev]);
        setNewCategory("");
        setCurrentPage(1); // নতুন ক্যাটাগরি যোগ হলে প্রথম পেজে নিয়ে যাবে
        toast.success(`${created.name} added successfully!`, { id: toastId });
      }
   
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err.message || "Failed to add category", { id: toastId });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="w-full min-h-screen p-4 md:p-10 space-y-8 animate-in fade-in duration-500 bg-slate-50/30 dark:bg-black">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 max-w-[1400px] mx-auto w-full">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-600 rounded-2xl text-white shadow-xl shadow-blue-500/20">
            <LayoutGrid size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tight dark:text-white uppercase leading-none">
              Category <span className="text-blue-600">Vault</span>
            </h1>
            <p className="text-muted-foreground text-sm font-medium mt-1">Manage and organize platform topics.</p>
          </div>
        </div>

        {/* Quick Search */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <Input 
            placeholder="Search categories..." 
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1); // সার্চ করলে পেজ রিসেট হবে
            }}
            className="pl-10 rounded-xl bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800"
          />
        </div>
      </div>

      {/* Input Section */}
      <Card className="w-full max-w-[1400px] mx-auto border-none shadow-2xl shadow-slate-200/50 dark:shadow-none dark:bg-zinc-950 rounded-[28px] overflow-hidden border dark:border-zinc-900">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <Input
                placeholder="Ex: Machine Learning, Data Science..."
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                disabled={isPending}
                className="pl-12 h-16 rounded-2xl border-slate-200 dark:border-zinc-800 focus-visible:ring-blue-500 text-base font-medium transition-all"
                onKeyDown={(e) => e.key === "Enter" && handleAddCategory()}
              />
            </div>
            <Button 
              disabled={isPending || !newCategory.trim()}
              onClick={handleAddCategory} 
              className="h-16 px-8 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all shadow-lg shadow-blue-500/25 active:scale-95 disabled:opacity-70"
            >
              {isPending ? <Loader2 className="animate-spin mr-2" /> : <Plus className="mr-2" />}
              CREATE CATEGORY
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Table Section */}
      <Card className="w-full max-w-[1400px] mx-auto border-none shadow-2xl shadow-slate-200/50 dark:shadow-none dark:bg-zinc-950 rounded-[32px] overflow-hidden border dark:border-zinc-900">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-900 dark:bg-zinc-900">
              <TableRow className="border-none hover:bg-transparent h-16">
                <TableHead className="w-40 font-bold uppercase text-[10px] tracking-[0.2em] text-slate-400 pl-10">Entry ID</TableHead>
                <TableHead className="font-bold uppercase text-[10px] tracking-[0.2em] text-slate-400">Category Label</TableHead>
                <TableHead className="text-right pr-10 font-bold uppercase text-[10px] tracking-[0.2em] text-slate-400">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedCategories.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="h-72 text-center">
                    <div className="flex flex-col items-center justify-center text-slate-300">
                      <ListFilter size={60} className="mb-4 opacity-20" />
                      <p className="font-black uppercase text-xs tracking-[4px]">No Matching Results</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                paginatedCategories.map((cat, index) => (
                  <TableRow
                    key={cat.id || index}
                    className="group border-slate-50 dark:border-zinc-900 hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-all h-20"
                  >
                    <TableCell className="pl-10 font-mono text-[11px] text-slate-400">
                      #{cat.id ? cat.id.slice(-8).toUpperCase() : "SYNCING"}
                    </TableCell>
                    <TableCell>
                      <span className="font-bold text-slate-800 dark:text-zinc-200 uppercase text-sm tracking-tight group-hover:text-blue-600 transition-colors">
                        {cat.name}
                      </span>
                    </TableCell>
                    <TableCell className="text-right pr-10">
                      <span className="inline-flex items-center px-4 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 text-[10px] font-black uppercase tracking-widest border border-emerald-100 dark:border-emerald-500/20">
                        Live / Active
                      </span>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="p-6 border-t border-slate-100 dark:border-zinc-900 flex items-center justify-between bg-white dark:bg-zinc-950">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredCategories.length)} of {filteredCategories.length}
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="rounded-xl border-slate-200 dark:border-zinc-800 font-bold"
              >
                <ChevronLeft size={16} className="mr-1" /> Prev
              </Button>
              <div className="flex items-center gap-1 mx-2">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`h-8 w-8 rounded-lg text-xs font-bold transition-all ${
                      currentPage === i + 1 
                      ? "bg-blue-600 text-white" 
                      : "text-slate-400 hover:bg-slate-100 dark:hover:bg-zinc-900"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="rounded-xl border-slate-200 dark:border-zinc-800 font-bold"
              >
                Next <ChevronRight size={16} className="ml-1" />
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}