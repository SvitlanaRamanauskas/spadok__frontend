import { ProductBase, ProductBaseUI } from "./ProductBase";

export type Vyshyvanka = ProductBase & {
  size: string;
  sizesAvailable: string[];
};

export type VyshyvankaUI = ProductBaseUI & {
  size: string;
  sizesAvailable: string[];
};
