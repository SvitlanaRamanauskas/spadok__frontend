import { Link } from "react-router-dom";
import "./ProductCard.scss";
import { DynamicProduct } from "../../types/Product";

export type Props = {
  item: DynamicProduct;
  productsFromServer: DynamicProduct[];
};

export const ProductCard: React.FC<Props> = ({ item, productsFromServer }) => {
  const url = window.location.href;
  const categoryAsLastWordInURL = url.split('/').pop();

  return (
    <div className="card">
      <div className="card__photo-container">
        <Link
          to={`/catalog/${categoryAsLastWordInURL}/${item.id}`}
          className="card__photo-link"
          state={{ productsFromServer }}
        >
          <img
            src={`${process.env.PUBLIC_URL}/${item.images[0]}`}
            alt="productCard"
            className="card__image"
          />
        </Link>

      </div>

      <h3 className="card__title-price">{item.title}</h3>

      <div className="card__title-price">{`${item.price} грн`}</div>
    </div>
  );
};
