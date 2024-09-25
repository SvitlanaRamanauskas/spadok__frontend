import { BookDetails } from "./BookDetails";
import { VyshyvankaDetails } from "./VyshyvankaDetails";

export type FavoritesItem = {
    id: number;
    item: VyshyvankaDetails | BookDetails;
}
