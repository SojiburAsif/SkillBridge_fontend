export interface PageProps {
  searchParams?: {
    search?: string;
    categoryId?: string;
    rating?: string;
    price?: string;
  };
}

export interface Booking {
  id: string;
  tutorId: string;
  studentId: string; // Eikhane '?' thakle soriye den jodi studentId mandatory hoy
  status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
  slotId?: string;
  dateTime?: string;
  tutor?: {
    name: string;
    email: string;
  };
  // ✅ Ei field-ta add korle "Property review does not exist" error chole jabe
  review?: {
    id: string;
    rating: number;
    comment: string;
  } | null;
}