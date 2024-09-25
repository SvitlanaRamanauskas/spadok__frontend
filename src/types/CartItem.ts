import { BookDetails } from "./BookDetails";
import { VyshyvankaDetails } from "./VyshyvankaDetails";

export type CartItem = {
    id: number;
    quantity: number;
    item: VyshyvankaDetails | BookDetails;
}
