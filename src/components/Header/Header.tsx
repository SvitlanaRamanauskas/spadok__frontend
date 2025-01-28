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
import { AppContext } from "../appContext";
import { fetchCategoriesNameList, fetchSubcategoriesEngList, fetchSubcategoriesNameList } from "../../helper/fetch";

export const Header = () => {
  const [vyshyvListExpanded, setVyshyvListExpanded] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [subcategories, setSubcategories] = useState<string[]>([]);
  const [subcategoriesEng, setSubcategoriesEng] = useState<string[]>([]);

  const { isAuthenticated, setIsAuthenticated } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
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

  useEffect(() => {
    const loadSubcategories = async () => {
        try {
            const categories: any = await fetchCategoriesNameList();
            setCategories(categories);
            const subcategories: any = await fetchSubcategoriesNameList();
            setSubcategories(subcategories);
            const subcategoriesEng: any = await fetchSubcategoriesEngList();
            setSubcategoriesEng(subcategoriesEng);
        } catch (error) {
            console.error("Failed to fetch categories:", error);
        }    
    }

    loadSubcategories();
  }, []);

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
            <Link to="/" className="header__logo-text">
              наш спадок
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
                </button>)}
 
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
                <ul className="nav__list">{
                  subcategories.map((subcategory, index) => (
                    <li className="nav__item">
                    <Link to={`/catalog/${subcategoriesEng[index]}`} className="nav__link">
                      {subcategory}
                    </Link>
                  </li>
                  ))
                  }
 
                  {/* <li className="nav__item">
                    <Link to="/catalog/men" className="nav__link">
                      чоловікам
                    </Link>
                  </li>
                  <li className="nav__item">
                    <Link to="/catalog/boys" className="nav__link">
                      хлопчикам
                    </Link>
                  </li>
                  <li className="nav__item">
                    <Link to="/catalog/girls" className="nav__link">
                      дівчаткам
                    </Link>
                  </li> */}
                </ul>
              </nav>


              <button className="nav__item header__short-nav-element">
                <Link to={`/catalog/books`} className="nav__link">
                  {categories[1]}
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

      {asideIsOpen && <AsideMenu />}
    </>
  );
};
