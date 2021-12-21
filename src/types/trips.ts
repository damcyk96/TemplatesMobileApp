export type Trip = {
  id: number;
  title: string;
  subtitle: string;
  price: number;
  images: string[];
  description: string[];
};

export type TripQueryKey = ['trip', { tripId: number | null }];
