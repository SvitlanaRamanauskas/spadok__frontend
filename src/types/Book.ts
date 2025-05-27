import { ProductBase, ProductBaseUI } from "./ProductBase";

export type Book = ProductBase & {
  genre: string;
};

export type BookUI = ProductBaseUI & {
  genre: string;
};
