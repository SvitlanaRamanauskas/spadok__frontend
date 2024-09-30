import "./Favorites.scss";
import classNames from "classnames";
import {
  favoritesSelector,
  removeItemFromFavorites,
} from "../../redux/cart/reducerFavorites";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { BookDetails } from "../../types/BookDetails";
import { FavoritesItem } from "../../types/FavoritesItem";
import { VyshyvankaDetails } from "../../types/VyshyvankaDetails";
import { Link } from "react-router-dom";

export const Favorites = () => {
  const favoriteItems: FavoritesItem[] = useAppSelector(favoritesSelector);
  const dispatch = useAppDispatch();

  const handleRemoveItem = (item: VyshyvankaDetails | BookDetails) => {
    dispatch(removeItemFromFavorites(item));
  };

  return (
    <>
      <h1>Favorites</h1>

      <ul className="favorites">
        {favoriteItems.map((favoriteItem) => (
          <li className="favorites__card" key={favoriteItem.id}>
            <Link
              to={`/catalog/${favoriteItem.item.category}/${favoriteItem.item.id}`}
              className="favorites__photo-link"
            >
              <img
                src={`/${favoriteItem.item.images[0]}`}
                alt="favoritesCard"
                className="favorites__image"
              />
            </Link>

            <button
              type="button"
              className="heart__icon-bg"
              onClick={() => handleRemoveItem(favoriteItem.item)}
            >
              <img
                src={
                  require("../../styles/icons/red_heart_icon.svg")
                    .default
                }
                alt=""
                className="heart__icon"
              />
            </button>

            {"name" in favoriteItem.item ? (
              <h2>{favoriteItem.item.name}</h2>
            ) : (
              <h2>{favoriteItem.item.title}</h2>
            )}

            <div className="favorites__price">{`${favoriteItem.item.price} грн`}</div>
          </li>
        ))}
      </ul>
    </>
  );
};
