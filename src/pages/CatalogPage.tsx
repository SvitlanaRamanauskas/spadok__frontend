import { Link } from "react-scroll";
import "../styles/App.scss";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { scrollToTop } from "../App";



export const CatalogPage = () => {
    const location = useLocation();
    useEffect(() => {
        scrollToTop();
      }, []);

  return (
    <>
      {location.pathname === "/catalog" && (
        <div className="topic__container">
          <Link to="/women" className="topic topic--women">
            <div className="topic__background topic__background--women">
              {/* <img className="category__image" src="" alt="for_women" /> */}
              <div className="topic-wrapper">
                <p className="topic">жіночі вишиванки</p>
              </div>
            </div>
          </Link>
          <Link to="/men" className="topic topic--men">
            <div className="topic__background topic__background--men">
              <div className="topic-wrapper">
                <p className="v">чоловічи вишиванки</p>
              </div>
            </div>
          </Link>
          <Link to="/girls" className="topic topic--girls">
            <div className="topic__background topic__background--girls">
              <div className="topic__title-wrapper">
                <p className="topic__title">вишиванки дівчатам</p>
              </div>
            </div>
          </Link>
          <Link to="/boys" className="topic topic--boys">
            <div className="topic__background topic__background--boys">
              <div className="topic__title-wrapper">
                <p className="topic__title">вишиванки хлопчикам</p>
              </div>
            </div>
          </Link>
          <Link to="/books" className="topic topic--books">
            <div className="topic__background topic__background--books">
              <div className="topic__title-wrapper">
                <p className="topic__title">книги</p>
              </div>
            </div>
          </Link>
        </div>
      )}

      <Outlet />
    </>
  );
};
