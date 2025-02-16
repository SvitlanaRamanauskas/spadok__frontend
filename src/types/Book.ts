import { ProductBase } from "./ProductBase";

export type Book = ProductBase & {
    genre: string;
};
