import { ProductBase } from "./ProductBase";

export type DynamicProduct = ProductBase & Record<string, any>;
