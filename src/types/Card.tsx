export type CardType = {
  mainImageUrl: string;
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
