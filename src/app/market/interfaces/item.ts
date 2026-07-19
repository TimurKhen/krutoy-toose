export interface Item {
  id: number;
  title: string;
  description: string | null;
  price: number;
  imageUrl: string;
  can_buy: boolean;
}
