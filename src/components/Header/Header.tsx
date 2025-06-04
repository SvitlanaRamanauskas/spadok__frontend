import { Link, useNavigate } from "react-router-dom";
import cn from "classnames";
import "../../styles/App.scss";
import "./Header.scss";
import { ArrowDecorBelow } from "../ArrowDecorBelow";
import { ArrowDecorTop } from "../ArrowDecorTop";
import { useContext, useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { totalCartQuantitySelector } from "../../redux/cart/reducerCart";
import { totalFavoritesQuantitySelector } from "../../redux/cart/reducerFavorites";
import { AsideMenu } from "../AsideMenu";
import { AppContext } from "../appContext";

export const Header = () => {
  const { subcategories } = useContext(AppContext);
  const [vyshyvListExpanded, setVyshyvListExpanded] = useState(false);

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

  const vyshyvankyListRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      if (
        vyshyvankyListRef.current &&
        !vyshyvankyListRef.current.contains(event.target as Node)
      )
        setVyshyvListExpanded(false);
    };

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [vyshyvListExpanded]);

  const { setAsideIsOpen, asideIsOpen } = useContext(AppContext);

  const toggleMenuButton = () => {
    setAsideIsOpen((prev) => !prev);
  };

  return (
    <>
      <header id="header" className="header">
        <div className="header__container">
          <div className="header__logo">
            <>
              <img
                src={require("../../styles/icons/curve_line.svg").default}
                className="curve curve--top-left"
                alt="line"
              />
              <img
                src={require("../../styles/icons/curve_line.svg").default}
                className="curve curve--bottom-left"
                alt="line"
              />

              <img
                src={require("../../styles/icons/curve_line.svg").default}
                className="
                    curve 
                    curve--top-right
                    curve--top-right--mobile-header"
                alt="line"
              />
              <img
                src={require("../../styles/icons/curve_line.svg").default}
                className="
                    curve 
                    curve--bottom-right
                    curve--bottom-right--mobile-header
                "
                alt="line"
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
            <div ref={vyshyvankyListRef} className="header__short-navigation">
              {isAuthenticated && (
                <button
                  type="button"
                  className="nav__item header__short-nav-element"
                  onClick={handleLogout}
                >
                  <strong className="nav__link">Вийти з адмін панелі</strong>
                </button>
              )}

              <div
                className="header__nav-wrapper"
                onMouseEnter={() => setVyshyvListExpanded(true)}
                onMouseLeave={() => setVyshyvListExpanded(false)}
              >
                <button className="header__short-nav-element">
                  <p className="nav__link">Вишиванки</p>
                </button>

                <nav
                  className={cn("header__nav", {
                    "header__nav--opened": vyshyvListExpanded,
                  })}
                >
                  <ul className="nav__list header__short-nav-list">
                    {subcategories.map((subcategory) => (
                      <li className="nav__item" key={subcategory.name}>
                        <Link
                          to={`/catalog/${subcategory.key}`}
                          className="nav__link"
                          onClick={() => setVyshyvListExpanded(false)}
                        >
                          {subcategory.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>

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
                  onClick={(e) => {
                    e.stopPropagation();
                    setAsideIsOpen(false);
                  }}
                  title="Закрити"
                >
                  <img
                    src={require("../../styles/icons/Close.svg").default}
                    className="header__icon--close-image"
                    alt="close"
                  />
                </button>
              ) : (
                <button
                  type="button"
                  className="header__icon  header__icon--burger"
                  onClick={() => setAsideIsOpen(true)}
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
