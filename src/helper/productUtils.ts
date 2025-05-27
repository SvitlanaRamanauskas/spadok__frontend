import { FavoritesItem } from "../types/FavoritesItem";
import { CartItem } from "../types/CartItem";
import { VyshyvankaUI } from "../types/Vyshyvanka";
import { DynamicProductUI } from "../types/Product";


export const addedToFavorites = (itemsInFavorites: FavoritesItem[], id: number) => {
    return itemsInFavorites.some((item) => item.item.id === id);
};

export const addedToCart = (cartItemsAdded: CartItem[], itemId: number) => {
    return cartItemsAdded.some((itemInCart) => itemInCart.item.id === itemId);
};

export function isForKids(product: DynamicProductUI): product is VyshyvankaUI {
  return product.subcategory === "girls" || product.subcategory === "boys";
}


export function isForAdults(product: DynamicProductUI): product is VyshyvankaUI {
  return product.subcategory === "women" || product.subcategory === "men";
}
