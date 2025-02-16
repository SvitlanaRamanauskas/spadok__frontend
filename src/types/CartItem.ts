import { DynamicProduct } from "./Product";

export type CartItem = {
    id: number;
    quantity: number;
    item: DynamicProduct;
}
