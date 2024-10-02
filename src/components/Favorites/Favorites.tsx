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
import { ArrowDecorTop } from "../ArrowDecorTop";

export const Favorites = () => {
  const favoriteItems: FavoritesItem[] = useAppSelector(favoritesSelector);
  const dispatch = useAppDispatch();

  const handleRemoveItem = (item: VyshyvankaDetails | BookDetails) => {
    dispatch(removeItemFromFavorites(item));
  };

  return (
    <>
      <div className="favorites__title-wrapper">
        <h3 className="favorites__title">Favorites</h3>
      </div>

      <ul className="favorites__list">
        <ArrowDecorTop />
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
                src={require("../../styles/icons/red_heart_icon.svg").default}
                alt=""
                className="heart__icon"
              />
            </button>

            {"name" in favoriteItem.item ? (
              <h3 className="favorites__title-price">{favoriteItem.item.name}</h3>
            ) : (
              <h3 className="favorites__title-price">{favoriteItem.item.title}</h3>
            )}

            <div className="favorites__title-price">{`${favoriteItem.item.price} грн`}</div>
          </li>
        ))}
      </ul>
    </>
  );
};
