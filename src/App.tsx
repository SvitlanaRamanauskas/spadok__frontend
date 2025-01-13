import { useContext, useEffect, useState } from "react";
import cn from "classnames";
import "./styles/App.scss";
import { Link, Outlet } from "react-router-dom";
import { scroller } from "react-scroll";
import { AsideMenu } from "./components/AsideMenu";
import { AppContext } from "./components/appContext";
import { ArrowDecorTop } from "./components/ArrowDecorTop";
import { ArrowDecorBelow } from "./components/ArrowDecorBelow";
import { useAppSelector } from "./redux/hooks";
import { totalCartQuantitySelector } from "./redux/cart/reducerCart";
import { totalFavoritesQuantitySelector } from "./redux/cart/reducerFavorites";
import { ThreadDecor } from "./components/ThreadDecor";

export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

export const handleNavigation = (section: any) => {
  setTimeout(() => {
    scroller.scrollTo(section, {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
    });
  }, 1000); // Delay to ensure the page is loaded
};

function App() {
  const [vyshyvListExpanded, setVyshyvListExpanded] = useState(false);
  const { setAsideIsOpen, asideIsOpen } = useContext(AppContext);

  const totalCartQuanity: number = useAppSelector(totalCartQuantitySelector);
  const totalFavoritesQuantity: number = useAppSelector(
    totalFavoritesQuantitySelector
  );

  const toggleMenuButton = () => {
    setAsideIsOpen(!asideIsOpen);
  };

  useEffect(() => {
    const handleDocumentClick = () => {
      setVyshyvListExpanded(false);
    };

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [vyshyvListExpanded]);

  return (
    <div className="app">
      <header className="header">
        <div className="header__container">
          <div className="header__logo">
            <>
              <img
                src={require("./styles/icons/curve_line.svg").default}
                className="curve curve--top-left"
                alt="Logo"
              />
              <img
                src={require("./styles/icons/curve_line.svg").default}
                className="curve curve--bottom-left"
                alt="Logo"
              />

              <img
                src={require("./styles/icons/curve_line.svg").default}
                className="
                  curve 
                  curve--top-right
                  curve--top-right--mobile-header"
                alt="Logo"
              />
              <img
                src={require("./styles/icons/curve_line.svg").default}
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
                src={require("./styles/icons/curve_line.svg").default}
                className="curve curve__below--top-left"
                alt="Logo"
              />
              <img
                src={require("./styles/icons/curve_line.svg").default}
                className="curve curve__below--bottom-left"
                alt="Logo"
              />

              <img
                src={require("./styles/icons/curve_line.svg").default}
                className="
                  curve 
                  curve__below--top-right
                  curve__below--top-right--mobile-header
                "
                alt="Logo"
              />
              <img
                src={require("./styles/icons/curve_line.svg").default}
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
                    require("./styles/icons/Chevron-Arrow-Right--disabled.svg")
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
                  <li className="nav__item">
                    <Link to="/catalog/women" className="nav__link">
                      жінкам
                    </Link>
                  </li>
                  <li className="nav__item">
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
                  </li>
                </ul>
              </nav>
              <button className="nav__item header__short-nav-element">
                <Link to="/catalog/books" className="nav__link">
                  книгі
                </Link>
              </button>
            </div>

            <div className="header__icons">
              <Link
                to="/favorites"
                className="header__icon header__icon--favorite"
              >
                <img
                  src={require("./styles/icons/heart.svg").default}
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
                  src={require("./styles/icons/bxs_cart.svg").default}
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
                >
                  <img
                    src={require("./styles/icons/Close.svg").default}
                    alt="close"
                  />
                </button>
              ) : (
                <button
                  type="button"
                  className="header__icon  header__icon--burger"
                  onClick={toggleMenuButton}
                >
                  <img
                    src={require("./styles/icons/menu-burger.svg").default}
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

      <main className="main">
        <Outlet />
      </main>

      <footer className="footer">
        <div className="footer__container">
          <div className="footer__wrapper">
            <ThreadDecor />
            <div className="footer__block footer__left">
              <Link to="/" className="logo">
                наш спадок
                <ArrowDecorBelow />
              </Link>
              <div className="footer__follow">
                <div className="footer__follow-text">Стежити</div>
                <a
                  href="https://www.instagram.com/julia_hapeka/"
                  target="_blank"
                  className=""
                  rel="noreferrer"
                >
                  <img
                    alt="follow"
                    className="footer__follow-icon"
                    src={require("./styles/icons/instagram21.svg").default}
                  />
                </a>
              </div>
            </div>
            <div className="footer__right">
              <nav className="footer__block footer__block--categories">
                <h3 className="footer__title">Категорії</h3>
                <ul className="footer__list">
                  <li className="footer__item">
                    <Link
                      to="/"
                      className="footer__link"
                      onClick={() => handleNavigation("about_us")}
                    >
                      Про нас
                    </Link>
                  </li>
                  <li className="footer__item">
                    <Link
                      to="/catalog"
                      className="footer__link"
                      onClick={() => handleNavigation("catalog")}
                    >
                      Каталог
                    </Link>
                  </li>
                  <li className="footer__item">
                    <Link
                      to="/"
                      className="footer__link"
                      onClick={() => handleNavigation("contact_us")}
                    >
                      Наші контакти
                    </Link>
                  </li>
                  <li className="footer__item">
                    <a href="@julia_hapeka" className="footer__link">
                      <img src="" alt="" />
                    </a>
                  </li>
                </ul>
              </nav>
              <nav className="footer__block footer__block--support">
                <h3 className="footer__title">Підтримка</h3>
                <ul className="footer__list">
                  <li className="footer__item">
                    <Link
                      to="/"
                      className="footer__link"
                      onClick={() => handleNavigation("about_us")}
                    >
                      Доставка & Оплата
                    </Link>
                  </li>
                  <li className="footer__item">
                    <Link
                      to="/"
                      className="footer__link"
                      onClick={() => handleNavigation("about_us")}
                    >
                      Допомога & Підтримка
                    </Link>
                  </li>
                </ul>
              </nav>
              <div className="footer__block footer__block--contact-data">
                <ul className="footer__list">
                  <li className="footer__item">
                    <a
                      href="tel:+380%2063%20415%2018%2053"
                      className="nav__link footer__link"
                    >
                      <p className="footer__phone-number">+38 096 3061416</p>
                    </a>
                  </li>
                  <li className="footer__item">
                    <a
                      href="jhapeka@gmail.com"
                      className="
                        nav__link
                        footer__link
                        footer__link--gmail
                      "
                    >
                      jhapeka@gmail.com
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer__rights">
            <p className="footer__rights-text">
              Nash_Spadok ©Copyright 2024. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

// <button
// type="button"
// className="header__icon header__icon--user-account"
// onClick={() => setAuthIsOpen(true)}
// >
// <svg
//   width="1.5em"
//   height="1.5em"
//   vertical-align="middle"
//   fill="currentColor"
//   overflow="hidden"
//   viewBox="0 0 1024 1024"
//   version="1.1"
//   xmlns="http://www.w3.org/2000/svg"
// >
//   <path d="M843.282963 870.115556c-8.438519-140.515556-104.296296-257.422222-233.908148-297.14963C687.881481 536.272593 742.4 456.533333 742.4 364.088889c0-127.241481-103.158519-230.4-230.4-230.4S281.6 236.847407 281.6 364.088889c0 92.444444 54.518519 172.183704 133.12 208.877037-129.611852 39.727407-225.46963 156.634074-233.908148 297.14963-0.663704 10.903704 7.964444 20.195556 18.962963 20.195556l0 0c9.955556 0 18.299259-7.774815 18.962963-17.73037C227.745185 718.506667 355.65037 596.385185 512 596.385185s284.254815 122.121481 293.357037 276.195556c0.568889 9.955556 8.912593 17.73037 18.962963 17.73037C835.318519 890.311111 843.946667 881.019259 843.282963 870.115556zM319.525926 364.088889c0-106.287407 86.186667-192.474074 192.474074-192.474074s192.474074 86.186667 192.474074 192.474074c0 106.287407-86.186667 192.474074-192.474074 192.474074S319.525926 470.376296 319.525926 364.088889z" />
// </svg>
// </button>

// {authIsOpen && (
// <Auth
//   authIsOpen={authIsOpen}
//   setAuthIsOpen={(value: boolean) => setAuthIsOpen(value)}
// />
// )}
