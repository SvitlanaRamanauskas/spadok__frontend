import { Vyshyvanka } from "./Vyshyvanka";
import { VyshyvankaDetails } from "./VyshyvankaDetails";

export type CartItem = {
    id: number;
    quantity: number;
    item: VyshyvankaDetails;
}
