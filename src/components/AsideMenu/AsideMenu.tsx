import { useContext, useEffect, useRef } from "react";
import "./AsideMenu.scss";
import { Link } from "react-router-dom";
import { AppContext } from "../appContext";
import { handleNavigation } from "../../App";
import { ThreadDecor } from "../ThreadDecor";
import { AdminSubcategory } from "../../types/AdminNames";

type Props = {
  subcategories: AdminSubcategory[];
};

export const AsideMenu: React.FC<Props> = ({ subcategories }) => {
  const { setAsideIsOpen, asideIsOpen } = useContext(AppContext);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setTimeout(() => {
          setAsideIsOpen(false);
        }, 1000);
        console.log("asiderendered", asideIsOpen);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    };

  }, [setAsideIsOpen, asideIsOpen]);

  return (
    <aside className="menu" ref={menuRef}>
      <section className="menu__part">
        <ul id="menu__list" className="nav__list">
          {subcategories.map((subcategory) => (
            <li key={subcategory.key} id="menu__item" className="nav__item">
              <Link
                to={`/catalog/${subcategory.key}`}
                id="menu__link"
                className="nav__link"
                onClick={() => setAsideIsOpen(false)}
              >
                {subcategory.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <div className="menu__separator">
        <img
          src={require("../../styles/icons/Line-thread-light.svg").default}
          className="thread thread--top-left"
          alt="Logo"
        />
        <img
          src={require("../../styles/icons/Line-thread-light.svg").default}
          className="thread thread--bottom-left"
          alt="Logo"
        />
      </div>

      <section className="menu__part menu__part--top">
        <ul className="nav__list menu__list">
          <li className="nav__item menu__item">
            <Link
              to="/"
              className="nav__link menu__link"
              onClick={() => {
                setAsideIsOpen(false);
                handleNavigation("about_us");
              }}
            >
              про наш спадок
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
              контакти
            </Link>
          </li>
        </ul>
      </section>
    </aside>
  );
};
