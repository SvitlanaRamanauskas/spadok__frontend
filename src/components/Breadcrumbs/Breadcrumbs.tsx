import { Link, useLocation } from "react-router-dom";
import "./Breadcrumbs.scss";
import { useContext } from "react";
import { AppContext } from "../appContext";

export const Breadcrumbs = () => {
  const { selectedProduct } = useContext(AppContext);
  const location = useLocation();
  const pathNameUrl = location.pathname.slice(1);

  return (
    <div className="breadcrumbs">
      <div className="breadcrumbs__line">
        <Link to="/" className="breadcrumbs__link">
          home
        </Link>
        {selectedProduct !== null ? (
          <>
            <Link to="/" className="breadcrumbs__link">
              {selectedProduct.category}
            </Link>
            
            <div className="breadcrumbs__point">{selectedProduct.name}</div>
          </>
        ) : (
          <>
            <div className="breadcrumbs__point">{pathNameUrl}</div>
          </>
        )}
      </div>
    </div>
  );
};
