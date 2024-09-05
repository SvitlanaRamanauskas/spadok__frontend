import { useContext } from "react";
import './AsideMenu.scss';
import { Link } from "react-router-dom";
import { AppContext } from "../appContext";
import { handleNavigation } from "../../App";

export const AsideMenu = () => {
    const { setAsideIsOpen } = useContext(AppContext);

    return (
    <aside className="menu">
        <ul className="nav__list menu__list">
          <li className="nav__item menu__item">
            <Link
              to="/catalog/women"
              className="nav__link menu__link"
              onClick={() => setAsideIsOpen(false)}
            >
              жінкам
            </Link>
          </li>
          <li className="nav__item menu__item">
            <Link
              to="catalog/men"
              className="nav__link menu__link"
              onClick={() => setAsideIsOpen(false)}
            >
              чоловікам
            </Link>
          </li>
          <li className="nav__item menu__item">
            <Link
              to="catalog/boys"
              className="nav__link menu__link"
              onClick={() => setAsideIsOpen(false)}
            >
              хлопчикам
            </Link>
          </li>
          <li className="nav__item menu__item">
            <Link
              to="catalog/girls"
              className="nav__link menu__link"
              onClick={() => setAsideIsOpen(false)}
            >
              дівчаткам
            </Link>
          </li>

          <li className="nav__item menu__item">
            <Link
              to="catalog/books"
              className="nav__link menu__link"
              onClick={() => setAsideIsOpen(false)}
            >
              книжки
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
    );
}
