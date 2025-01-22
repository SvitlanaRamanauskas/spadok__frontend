import "./Favorites.scss";
import "../../styles/Heart.scss";
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
import { ArrowDecorBelow } from "../ArrowDecorBelow";

export const Favorites = () => {
  const favoriteItems: FavoritesItem[] = useAppSelector(favoritesSelector);
  const dispatch = useAppDispatch();

  const handleRemoveItem = (item: VyshyvankaDetails | BookDetails) => {
    dispatch(removeItemFromFavorites(item));
  };

  return (
    <div className="favorites">
      <div className="favorites__title-wrapper">
        <h3 className="favorites__title">Улюблене</h3>
      </div>

      
      {favoriteItems.length > 0 ? (
        <ul className="favorites__list">
          <ArrowDecorTop />
          <ArrowDecorBelow />
          {favoriteItems.map((favoriteItem) => (
            <li className="favorites__card" key={favoriteItem.id}>
              <Link
                to={`/catalog/${favoriteItem.item.category}/${favoriteItem.item.id}`}
                className="favorites__photo-link"
              >
                <img
                  src={`${process.env.PUBLIC_URL}/${favoriteItem.item.images[0]}`}
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
                <h3 className="favorites__title-price">
                  {favoriteItem.item.name}
                </h3>
              ) : (
                <h3 className="favorites__title-price">
                  {favoriteItem.item.title}
                </h3>
              )}

              <div className="favorites__title-price">{`${favoriteItem.item.price} грн`}</div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="favorites__cover">
          <ArrowDecorTop />
          <ArrowDecorBelow />
          <p className="favorites__empty">Улюблені товари наразі не додані</p>
        </div>
      )}

      <div className="favorites__bottom">
        <Link
          to="/catalog"
          className="favorites__button favorites__button--start-purchases"
        >
          До каталогу
        </Link>
      </div>
    </div>
  );
};
