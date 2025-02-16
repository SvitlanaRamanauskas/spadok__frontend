import { ProductBase } from "./ProductBase";

export type Vyshyvanka = ProductBase & {
    size: string;
    sizesAvailable: string[];
  };