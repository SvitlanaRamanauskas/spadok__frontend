import { Book } from "./Book";
import { Vyshyvanka } from "./Vyshyvanka";

export type CartItem = {
    id: number;
    quantity: number;
    item: Vyshyvanka | Book;
}
