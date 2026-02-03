// Common User Type
export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  phone?: string;
}

// Common Category Type
export interface Category {
  id: string;
  name: string;
  slug?: string;
}

// Fixed Tutor Type (Relational data shoho)
export interface Tutor {
  id: string;
  userId: string;
  categoryId: string;
  experience: string;
  price: number;
  status: string;
  rating?: string | number;
  bio?: string;      // Added from your first version
  user: User;        // Relational Data (Must have)
  category: Category; // Relational Data (Must have)
}

// Slots & Booking Types
export type SlotInput = {
  date: string;       // YYYY-MM-DD
  startTime: string;  // HH:mm
  endTime: string;    // HH:mm
};

export type Slot = SlotInput & {
  id: string;
  dateTime?: string;
  isBooked: boolean;
  tutorProfileId: string;
};

export type TutorBooking = {
  id: string;
  dateTime: string;
  status: string;
  createdAt: string;
  studentId: string;
  tutorId: string;
  slotId: string | null;
  slot?: {
    id: string;
    date: string;
    startTime: string;
    endTime: string;
  } | null;
  student: User; // Reusing the User interface here for consistency
};


