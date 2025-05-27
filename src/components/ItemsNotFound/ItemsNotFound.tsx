import { Link } from "react-router-dom";
import "./ItemsNotFound.scss";

export const ItemsNotFound: React.FC = () => {
  return (
    <div className="no-items">
      <h5 className="no-items__title">Товар відсутній</h5>

      <button className="no-items__button">
        <Link to="/" className="no-items__link">
          На головну
        </Link>
      </button>

      <button className="no-items__button">
        <Link to="/catalog" className="no-items__link">
          До каталогу
        </Link>
      </button>
    </div>
  );
};
