import { Favorites } from "../components/Favorites";
import { favoritesSelector, removeItem, totalFavoritesQuantitySelector } from "../redux/cart/reducerFavorites";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import '../styles/FavoritesPage.scss';
import { FavoritesItem } from "../types/FavoritesItem";
import { Vyshyvanka } from "../types/Vyshyvanka";

export const FavoritesPage = () => {

  return (
    <div>
      <Favorites />
    </div>
  );
};
