export interface Tutor {
  [x: string]: string | undefined;
  id: string;
  price: string;
  rating: number;
  experience: string;
  status: string;
  bio: string;
  category: {
    name: string;
  };
  user: {
    email: string;
    phone: string;
    role: string;
    name: string;
    image: string;
  };
}



