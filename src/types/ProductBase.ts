export type ProductBase = {
  id: number;
  categoryId: number;
  subcategoryId: number;
  title: string;
  images: string[];
  price: number;
  description: string;
  isAvailable: number;
}

export type ProductBaseUI = {
  id: number;
  category: string;
  subcategory: string;
  title: string;
  images: string[];
  price: number;
  description: string;
  isAvailable: number;
}
