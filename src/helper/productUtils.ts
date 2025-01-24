import { FavoritesItem } from "../types/FavoritesItem";
import { CartItem } from "../types/CartItem";
import { Vyshyvanka } from "../types/Vyshyvanka";
import { Product } from "../types/Product";


export const addedToFavorites = (itemsInFavorites: FavoritesItem[], id: string) => {
    return itemsInFavorites.some((item) => item.item.id === id);
};

export const addedToCart = (cartItemsAdded: CartItem[], itemId: string) => {
    return cartItemsAdded.some((itemInCart) => itemInCart.item.id === itemId);
};

export function isVyshyvanka(product: Product): product is Vyshyvanka {
  return product.category === "vyshyvanka";
}
