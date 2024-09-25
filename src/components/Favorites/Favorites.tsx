import { removeItem } from "../../redux/cart/reducerCart";
import { favoritesSelector, totalFavoritesQuantitySelector } from "../../redux/cart/reducerFavorites";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { BookDetails } from "../../types/BookDetails";
import { FavoritesItem } from "../../types/FavoritesItem";
import { VyshyvankaDetails } from "../../types/VyshyvankaDetails";

export const Favorites = () => {
    const items: FavoritesItem[] = useAppSelector(favoritesSelector);
    const totalFavoritesQuantity: number = useAppSelector(totalFavoritesQuantitySelector);
  
    const dispatch = useAppDispatch();
  
    const handleRemoveItem = (item: VyshyvankaDetails | BookDetails) => {
      dispatch(removeItem(item));
    };

    return (
        <>
            <h1>Favorites</h1>
            
            <ul>
              {items.map((item) => (
                <li key={item.id}>
                  {"name" in item.item ? (
                    <h2>{item.item.name}</h2>
                  ) : (
                    <h2>{item.item.title}</h2>
                  )}
                 
                  <p>ID: ${item.item.id}</p>
                  <p>Price: ${item.item.price}</p>
                  <button className="cart__remove" onClick={() => handleRemoveItem(item.item)}>Remove</button>
                </li>
              ))}
            </ul>
            <h2>Total Quantity: {totalFavoritesQuantity}</h2>
        </>
    )
}