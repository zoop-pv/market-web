export type CardType = {
  url: string;
  name: string;
  price: number;
  address: string;
  distance?: string;
  description: string;
  rating: number;
  openHours: string;
  location: {
    coordinates: number[];
  };
};
