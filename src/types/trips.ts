export type Trip = {
  id: number;
  title: string;
  subtitle: string;
  price: number;
  images: string[];
  description: string[];
  color: string;
};

export type TripFormData = {
  title: string;
  price: number;
  dates: {
    day: number;
    people: number;
  }[];
};

export type TripQueryKey = ['trip', { tripId: number | null }];
