import { CartItem } from "./CartItem";

export type Order = {
    buyerName: string;
    phoneNumber: string;
    orderedProducts: CartItem[];
    orderId: string;
};
