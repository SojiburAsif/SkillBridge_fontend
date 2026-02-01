// src/types/tutor.ts
export type Tutor = {
  id: string;
  name?: string;
  email?: string;
  image?: string;
  bio?: string;
  experience?: string;
  price?: number;
  categoryId?: string;
};

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
  slotId: string | null; // slotId যোগ করা হলো
  slot?: {               // সরাসরি স্লট ডাটা থাকলে তার জন্য
    id: string;
    date: string;
    startTime: string;
    endTime: string;
  } | null;
  student: {
    id: string;
    name: string;
    email: string;
    image?: string;
    phone?: string;
  };
};
