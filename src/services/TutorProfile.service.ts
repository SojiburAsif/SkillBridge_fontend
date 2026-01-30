import { env } from "@/env";
import { Tutor } from "@/types/Tutor.type";

const API_URL = env.NEXT_PUBLIC_API_URL;

interface TutorApiResponse {
  data: Tutor[];
}

export interface TutorQueryParams {
  id?: string;          // single tutor fetch
  search?: string;
  categoryId?: string;
  rating?: number;
  price?: number;
}

export const TutorService = {
  // multiple tutors with filters
  getTutorProfile: async (
    params?: TutorQueryParams
  ): Promise<{ data: TutorApiResponse | null; error: string | null }> => {
    try {
      const query = new URLSearchParams();

      if (params?.id) query.append("id", params.id);
      if (params?.search) query.append("search", params.search);
      if (params?.categoryId) query.append("categoryId", params.categoryId);
      if (params?.rating) query.append("rating", String(params.rating));
      if (params?.price) query.append("price", String(params.price));

      const res = await fetch(`${API_URL}/api/tutor/profile?${query.toString()}`, {
        cache: "no-store",
      });
      const data = await res.json();
      return { data, error: null };
    } catch (err) {
      console.error(err);
      return { data: null, error: "Failed to fetch tutor profile" };
    }
  },

  // single tutor by ID



  getTutorById: async function (id: string) {
    try {
      const res = await fetch(`${API_URL}/api/tutor/profile/${id}`);

      const data = await res.json();

      return { data: data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },

  // categories fetch
  getCategories: async (): Promise<{ data: { id: string; name: string }[]; error: string | null }> => {
    try {
      const res = await fetch(`${API_URL}/api/categories`);
      const data = await res.json();
      return { data: data?.data ?? data ?? [], error: null };
    } catch (err) {
      console.error(err);
      return { data: [], error: "Failed to fetch categories" };
    }
  },
};
