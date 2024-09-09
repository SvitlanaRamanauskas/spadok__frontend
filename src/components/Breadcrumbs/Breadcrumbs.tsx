import { Link, useLocation } from "react-router-dom";
import "./Breadcrumbs.scss";

export const Breadcrumbs = () => {
  const location = useLocation();

  const locationArr = location.pathname.split('/');

  return (
    <div className="breadcrumbs">
      <div className="breadcrumbs__line">
        <Link 
          to="/catalog" 
          className="breadcrumbs__link"
        >
          <p className="breadcrumbs__text">Catalog</p>
        </Link>

        {locationArr[3] !== undefined ? (
          <>
            <Link
              to={`${locationArr[2]}`}
              className="breadcrumbs__link"
            >
              <p className="breadcrumbs__text">{`/ ${locationArr[2]}`}</p>
            </Link>

            <div className="breadcrumbs__link">
              <p className="breadcrumbs__text">{`/ ${locationArr[3]}`}</p>
            </div>
          </>
        ) : (
          <>
            {location.pathname !== "/catalog" && (
              <div className="breadcrumbs__link">
                <p className="breadcrumbs__text">{`/ ${locationArr[2]}`}</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
