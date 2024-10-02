import { Link } from "react-router-dom";
import "./ProductCard.scss";
import { Vyshyvanka } from "../../types/Vyshyvanka";
import { useContext } from "react";
import { AppContext } from "../appContext";
import { Book } from "../../types/Book";

export type Props = {
  item: Vyshyvanka | Book;
};

export const ProductCard: React.FC<Props> = ({ item }) => {
  // const { setSelectedCard } = useContext(AppContext);

  const nameOrTitle = "name" in item ? item.name : item.title;


  return (
    <div className="card">
      <div className="card__photo-container">
        <Link
          to={`/catalog/women/${item.id}`}
          className="card__photo-link"
          // onClick={() => setSelectedCard(item)}
        >
          <img
            src={`/${item.image}`}
            alt="productCard"
            className="card__image"
          />
        </Link>

      </div>
      <h3 className="card__title-price">{nameOrTitle}</h3>

      <div className="card__title-price">{`${item.price} грн`}</div>
    </div>
  );
};
