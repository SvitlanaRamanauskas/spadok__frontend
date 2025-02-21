import { FavoritesItem } from "../types/FavoritesItem";
import { CartItem } from "../types/CartItem";
import { Vyshyvanka } from "../types/Vyshyvanka";
import { DynamicProduct } from "../types/Product";


export const addedToFavorites = (itemsInFavorites: FavoritesItem[], id: string) => {
    return itemsInFavorites.some((item) => item.item.id === id);
};

export const addedToCart = (cartItemsAdded: CartItem[], itemId: string) => {
    return cartItemsAdded.some((itemInCart) => itemInCart.item.id === itemId);
};

export function isVyshyvanka(product: DynamicProduct): product is Vyshyvanka {
  return product.category === "vyshyvanky";
}

export function isForKids(product: DynamicProduct): product is Vyshyvanka {
  return product.subcategory === "girls" || product.subcategory === "boys";
}


export function isForAdults(product: DynamicProduct): product is Vyshyvanka {
  return product.subcategory === "women" || product.subcategory === "men";
}
