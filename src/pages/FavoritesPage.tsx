import { favoritesSelector, removeItem, totalFavoritesQuantitySelector } from "../redux/cart/reducerFavorites";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import '../styles/FavoritesPage.scss';
import { FavoritesItem } from "../types/FavoritesItem";
import { Vyshyvanka } from "../types/Vyshyvanka";

export const FavoritesPage = () => {

  const items: FavoritesItem[] = useAppSelector(favoritesSelector);
  const totalFavoritesQuantity: number = useAppSelector(totalFavoritesQuantitySelector);

  const dispatch = useAppDispatch();

  const handleRemoveItem = (item: Vyshyvanka) => {
    dispatch(removeItem(item));
  };

  return (
    <div>
      <h1>Favorites</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <h2>{item.item.name}</h2>
            <p>ID: ${item.item.id}</p>
            <p>Price: ${item.item.price}</p>
            <button className="cart__remove" onClick={() => handleRemoveItem(item.item)}>Remove</button>
          </li>
        ))}
      </ul>
      <h2>Total Quantity: {totalFavoritesQuantity}</h2>
    </div>
  );
};
