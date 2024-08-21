import { useLayoutEffect, useState } from "react";
import cn from "classnames";
import "./styles/App.scss";
import { Link, Outlet, useLocation } from "react-router-dom";
import { scroller } from "react-scroll";
import { Auth } from "./components/Auth";

function App() {
  const [asideIsOpen, setAsideIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [authIsOpen, setAuthIsOpen] = useState(false);

  const handleNavigation = (section: any) => {
    setTimeout(() => {
      scroller.scrollTo(section, {
        duration: 800,
        delay: 0,
        smooth: "easeInOutQuart",
      });
    }, 100); // Delay to ensure the page is loaded
  };

  const location = useLocation();

  const toggleMenuButton = () => {
    setAsideIsOpen(!asideIsOpen);
  };

  useLayoutEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  return (
    <div className="app">
      <header className={cn("header", { "header--scrolled": scrolled })}>
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
              src={require("./styles/icons/Burger.svg").default}
              alt="menu"
            />
          </button>
        )}
        <nav className="header__nav">
          <ul className="nav__list">
            <li className="nav__item">
              <Link to="women" className="nav__link">
                жінкам
              </Link>
            </li>
            <li className="nav__item">
              <Link to="men" className="nav__link">
                чоловікам
              </Link>
            </li>
            <li className="nav__item">
              <Link to="boys" className="nav__link">
                хлопчикам
              </Link>
            </li>
            <li className="nav__item">
              <Link to="girls" className="nav__link">
                дівчаткам
              </Link>
            </li>
          </ul>
        </nav>
        <div className="header__logo">
          <Link to="/home" className="header__logo-link">
            <img src={require("./styles/icons/Logo.svg").default} alt="Logo" />
          </Link>
        </div>
        <div className="header__right">
          {(location.pathname === "/women" ||
            location.pathname === "/men" ||
            location.pathname === "/girls" ||
            location.pathname == "/boys") && (
              <div className="header__search">
                <img
                  src={require("./styles/icons/Search.svg").default}
                  alt="search"
                />
                <input
                  type="search"
                  className="header__search-input"
                  placeholder="search"
                />
              </div>
            )}

          <div className="header__icons">
            <button
              type="button"
              className="header__icon header__icon--user-account"
              onClick={() => setAuthIsOpen(true)}
            >
              <svg
                width="1.5em"
                height="1.5em"
                vertical-align="middle"
                fill="currentColor"
                overflow="hidden"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M843.282963 870.115556c-8.438519-140.515556-104.296296-257.422222-233.908148-297.14963C687.881481 536.272593 742.4 456.533333 742.4 364.088889c0-127.241481-103.158519-230.4-230.4-230.4S281.6 236.847407 281.6 364.088889c0 92.444444 54.518519 172.183704 133.12 208.877037-129.611852 39.727407-225.46963 156.634074-233.908148 297.14963-0.663704 10.903704 7.964444 20.195556 18.962963 20.195556l0 0c9.955556 0 18.299259-7.774815 18.962963-17.73037C227.745185 718.506667 355.65037 596.385185 512 596.385185s284.254815 122.121481 293.357037 276.195556c0.568889 9.955556 8.912593 17.73037 18.962963 17.73037C835.318519 890.311111 843.946667 881.019259 843.282963 870.115556zM319.525926 364.088889c0-106.287407 86.186667-192.474074 192.474074-192.474074s192.474074 86.186667 192.474074 192.474074c0 106.287407-86.186667 192.474074-192.474074 192.474074S319.525926 470.376296 319.525926 364.088889z" />
              </svg>
            </button>

            {authIsOpen && (
              <Auth authIsOpen={authIsOpen} setAuthIsOpen={(value: boolean) => setAuthIsOpen(value)}/>
            )}

            <Link
              to="/favorites"
              className="header__icon header__icon--favorite"
            >
              <img
                src={
                  require("./styles/icons/Favourites-Heart-Like.svg").default
                }
                alt="heart"
              />
            </Link>

            <Link to="/cart" className="header__icon header__icon--cart">
              <img
                src={require("./styles/icons/CartSmall.svg").default}
                alt="cart"
              />
            </Link>
          </div>
        </div>
      </header>

      {asideIsOpen && (
        <aside className="menu">
          <ul className="nav__list menu__list">
            <li className="nav__item menu__item">
              <Link
                to="women"
                className="nav__link menu__link"
                onClick={() => setAsideIsOpen(false)}
              >
                жінкам
              </Link>
            </li>
            <li className="nav__item menu__item">
              <Link
                to="men"
                className="nav__link menu__link"
                onClick={() => setAsideIsOpen(false)}
              >
                чоловікам
              </Link>
            </li>
            <li className="nav__item menu__item">
              <Link
                to="boys"
                className="nav__link menu__link"
                onClick={() => setAsideIsOpen(false)}
              >
                хлопчикам
              </Link>
            </li>
            <li className="nav__item menu__item">
              <Link
                to="girls"
                className="nav__link menu__link"
                onClick={() => setAsideIsOpen(false)}
              >
                дівчаткам
              </Link>
            </li>

            <li className="nav__item menu__item">
              <Link
                to="/"
                className="nav__link menu__link"
                onClick={() => {
                  setAsideIsOpen(false);
                  handleNavigation("contact_us");
                }}
              >
                Зв'язатись з нами
              </Link>
            </li>
          </ul>
        </aside>
      )}

      <main className="main">
        <Outlet />
      </main>

      <footer className="footer">
        <nav className="footer__nav">
          <ul className="nav__list footer__list">
            <li className="nav__item footer__item">
              <a
                href="https://www.instagram.com/julia_hapeka/"
                target="_blank"
                className="nav__link footer__link"
              >
                instagram
              </a>
            </li>

            <li className="nav__item footer__item">
              <a
                href="https://www.instagram.com/julia_hapeka/"
                target="_blank"
                className="nav__link footer__link"
              >
                facebook
              </a>
            </li>

            <li className="nav__item footer__item">
              <a
                href="tel:+380%2063%20415%2018%2053"
                className="nav__link footer__link"
              >
                зателефонувати
              </a>
            </li>

            <li className="nav__item footer__item">
              <a href="jhapeka@gmail.com" className="nav__link footer__link">
                електронна пошта
              </a>
            </li>

            <li className="nav__item footer__item">
              <a href="@julia_hapeka" className="nav__link footer__link">
                <img src="" alt="" />
              </a>
            </li>
          </ul>
        </nav>

        <div className="footer__rights">
          <img src={require("./styles/icons/copyrighting-icon.svg").default} />
          <p className="footer__rights-text">all rights reserved</p>
        </div>
      </footer>
    </div>
  );
}

export default App;