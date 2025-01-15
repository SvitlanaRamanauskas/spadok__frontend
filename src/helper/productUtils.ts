import { FavoritesItem } from "../types/FavoritesItem";
import { CartItem } from "../types/CartItem";
import { VyshyvankaDetails } from "../types/VyshyvankaDetails";
import { BookDetails } from "../types/BookDetails";

export const addedToFavorites = (itemsInFavorites: FavoritesItem[], id: string) => {
    return itemsInFavorites.some((item) => item.item.id === id);
};

export const addedToCart = (cartItemsAdded: CartItem[], itemId: string) => {
    return cartItemsAdded.some((itemInCart) => itemInCart.item.id === itemId);
};

export const selectedProductNameOrTitle = (
    selectedProduct: VyshyvankaDetails | BookDetails
  ) => {
    if (selectedProduct) {
      return "name" in selectedProduct
        ? selectedProduct.name
        : selectedProduct?.title;
    }
  };
