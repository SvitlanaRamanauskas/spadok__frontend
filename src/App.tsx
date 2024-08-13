import { useLayoutEffect, useState } from "react";
import cn from 'classnames';
import "./styles/App.scss";
import { Link, Outlet, useLocation } from "react-router-dom";
import { scroller } from 'react-scroll';


function App() {
  const [asideIsOpen, setAsideIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleNavigation = (section: any) => {
    setTimeout(() => {
      scroller.scrollTo(section, {
        duration: 800,
        delay: 0,
        smooth: 'easeInOutQuart',
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
    }

    handleScroll();

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <div className="app">
      <header className={cn('header', {'header--scrolled' : scrolled} )}>
      
        {asideIsOpen ? (
          <button
            type="button"
            className="header__icon  header__icon--close"
            onClick={toggleMenuButton}
          >
            <img src={require('./styles/icons/Close.svg').default} alt="close" />
          </button>
        ) : (
          <button
            type="button"
            className="header__icon  header__icon--burger"
            onClick={toggleMenuButton}
          >
            <img src={require('./styles/icons/Burger.svg').default} alt="menu" />
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
            <img src={require('./styles/icons/Logo.svg').default} alt="Logo" />
          </Link>
        </div>
        <div className="header__right">
          <div className="header__search">
            <img src={require('./styles/icons/Search.svg').default} alt="search" />
            <input
              type="search"
              className="header__search-input"
              placeholder="search"
            />
          </div>
          <div className="header__icons">
            <Link to="/favorites" className="header__icon header__icon--favorite">
              <img src={require('./styles/icons/Favourites-Heart-Like.svg').default} alt="heart" />
            </Link>
            <Link to="/cart" className="header__icon header__icon--cart">
              <img src={require('./styles/icons/CartSmall.svg').default} alt="cart" />
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
                    setAsideIsOpen(false)
                    handleNavigation("contact_us")
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
              <a 
                href="jhapeka@gmail.com"  
                className="nav__link footer__link"
              >
                електронна пошта
              </a>
            </li>

            <li className="nav__item footer__item">
              <a 
                href="@julia_hapeka"  
                className="nav__link footer__link"
              >
                <img src="" alt="" />
              </a>
            </li>
          </ul>
        </nav>

        <div className="footer__rights">
          <img src={require('./styles/icons/copyrighting-icon.svg').default} />
          <p className="footer__rights-text">
            all rights reserved
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
