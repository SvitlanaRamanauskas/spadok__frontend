import { ProductBase, ProductBaseUI } from "./ProductBase";

export type DynamicProduct = ProductBase & Record<string, any>;
export type DynamicProductUI = ProductBaseUI & Record<string, any>;
