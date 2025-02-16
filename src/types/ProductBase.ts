export type ProductBase = {
  id: string;
  category: string;
  subcategory: string;
  title: string;
  images: string[];
  price: number;
  description: string;
  isAvailable: boolean;
}