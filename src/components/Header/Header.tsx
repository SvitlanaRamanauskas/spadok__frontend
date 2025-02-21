import { Link, useNavigate } from "react-router-dom";
import cn from "classnames";
import "./Header.scss";
import "../../styles/App.scss";
import { ArrowDecorBelow } from "../ArrowDecorBelow";
import { ArrowDecorTop } from "../ArrowDecorTop";
import { useContext, useEffect, useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { totalCartQuantitySelector } from "../../redux/cart/reducerCart";
import { totalFavoritesQuantitySelector } from "../../redux/cart/reducerFavorites";
import { AsideMenu } from "../AsideMenu";
import { AppContext, AppProvider } from "../appContext";
import {
  fetchCategoriesList,
  fetchSubcategoriesList,
} from "../../helper/fetch";
import { AdminCategory, AdminSubcategory } from "../../types/AdminNames";

export const Header = () => {
  const { subcategories } = useContext(AppContext);
  const [vyshyvListExpanded, setVyshyvListExpanded] = useState(false);
  const [categories, setCategories] = useState<AdminCategory[]>([]);
  // const [subcategories, setSubcategories] = useState<AdminSubcategory[]>([]);

  const { isAuthenticated, setIsAuthenticated } = useContext(AppContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    navigate("/login");
  };

  const totalCartQuanity: number = useAppSelector(totalCartQuantitySelector);
  const totalFavoritesQuantity: number = useAppSelector(
    totalFavoritesQuantitySelector
  );

  useEffect(() => {
    const handleDocumentClick = () => {
      setVyshyvListExpanded(false);
    };

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [vyshyvListExpanded]);

  const { setAsideIsOpen, asideIsOpen } = useContext(AppContext);

  const toggleMenuButton = () => {
    setAsideIsOpen(!asideIsOpen);
  };

  return (
    <>
      <header className="header">
        <div className="header__container">
          <div className="header__logo">
            <>
              <img
                src={require("../../styles/icons/curve_line.svg").default}
                className="curve curve--top-left"
                alt="Logo"
              />
              <img
                src={require("../../styles/icons/curve_line.svg").default}
                className="curve curve--bottom-left"
                alt="Logo"
              />

              <img
                src={require("../../styles/icons/curve_line.svg").default}
                className="
                    curve 
                    curve--top-right
                    curve--top-right--mobile-header"
                alt="Logo"
              />
              <img
                src={require("../../styles/icons/curve_line.svg").default}
                className="
                    curve 
                    curve--bottom-right
                    curve--bottom-right--mobile-header
                "
                alt="Logo"
              />
            </>

            <Link to="/" className="header__logo-link">
              <img
                className="header__logo-image"
                src={`${process.env.PUBLIC_URL}/Logo/Logo_mokko.png`}
                alt=""
              />
            </Link>

            <>
              <img
                src={require("../../styles/icons/curve_line.svg").default}
                className="curve curve__below--top-left"
                alt="Logo"
              />
              <img
                src={require("../../styles/icons/curve_line.svg").default}
                className="curve curve__below--bottom-left"
                alt="Logo"
              />

              <img
                src={require("../../styles/icons/curve_line.svg").default}
                className="
                    curve 
                    curve__below--top-right
                    curve__below--top-right--mobile-header
                "
                alt="Logo"
              />
              <img
                src={require("../../styles/icons/curve_line.svg").default}
                className="
                    curve 
                    curve__below--bottom-right
                    curve__below--bottom-right--mobile-header
                "
                alt="Logo"
              />
            </>
          </div>

          <div className="header__right">
            <ArrowDecorTop />
            <div className="header__short-navigation">
              {isAuthenticated && (
                <button
                  type="button"
                  className="nav__item header__short-nav-element"
                  onClick={handleLogout}
                >
                  Вийти
                </button>
              )}

              <button
                className="nav__item header__short-nav-element"
                onClick={(e) => {
                  e.stopPropagation();
                  setVyshyvListExpanded((current) => !current);
                }}
              >
                <p className="nav__link">Вишиванки</p>

                <img
                  className={cn("header__short-nav-element-icon", {
                    "header__short-nav-element-icon--focused":
                      vyshyvListExpanded,
                  })}
                  src={
                    require("../../styles/icons/Chevron-Arrow-Right--disabled.svg")
                      .default
                  }
                  alt="clicker"
                />
              </button>

              <nav
                className={cn("header__nav", {
                  "header__nav--opened": vyshyvListExpanded,
                })}
              >
                <ul className="nav__list">
                  {subcategories.map((subcategory) => (
                    <li className="nav__item" key={subcategory.name}>
                      <Link
                        to={`/catalog/${subcategory.key}`}
                        className="nav__link"
                      >
                        {subcategory.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <button className="nav__item header__short-nav-element">
                <Link to={`/catalog/books`} className="nav__link">
                  Книжки
                </Link>
              </button>
            </div>

            <div className="header__icons">
              <Link
                to="/favorites"
                className="header__icon header__icon--favorite"
              >
                <img
                  src={require("../../styles/icons/heart.svg").default}
                  alt="heart"
                  className="header__icon-picture"
                />

                {totalFavoritesQuantity > 0 && (
                  <div className="header__icon-circle">
                    {totalFavoritesQuantity}
                  </div>
                )}
              </Link>

              <Link to="/cart" className="header__icon header__icon--cart">
                <img
                  src={require("../../styles/icons/bxs_cart.svg").default}
                  alt="cart"
                />

                {totalCartQuanity > 0 && (
                  <div className="header__icon-circle">{totalCartQuanity}</div>
                )}
              </Link>
              {asideIsOpen ? (
                <button
                  type="button"
                  className="header__icon  header__icon--close"
                  onClick={toggleMenuButton}
                  title="Закрити"
                >
                  <img
                    src={require("../../styles/icons/Close.svg").default}
                    alt="close"
                  />
                </button>
              ) : (
                <button
                  type="button"
                  className="header__icon  header__icon--burger"
                  onClick={toggleMenuButton}
                  title="Меню"
                >
                  <img
                    src={require("../../styles/icons/menu-burger.svg").default}
                    alt="menu"
                  />
                </button>
              )}
            </div>
            <ArrowDecorBelow />
          </div>
        </div>
      </header>

      {asideIsOpen && <AsideMenu subcategories={subcategories} />}
    </>
  );
};
