import { Link } from "react-router-dom";
import cn from "classnames";
import { ArrowDecorTop } from "../ArrowDecorTop";
import { ThreadDecor } from "../ThreadDecor";
import "./Footer.scss";
import { handleNavigation, scrollToTop } from "../../App";
import { useEffect, useState } from "react";

export const Footer = () => {
  const [toTopVisible, setToTopVisible] = useState(false);

  useEffect(() => {
    const toggleToTopVisiability = () => {
      setToTopVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleToTopVisiability);

    return () => window.removeEventListener("scroll", toggleToTopVisiability);
  }, []);

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__wrapper">
          <ThreadDecor />
          <div className="footer__block footer__left">
            <Link className="footer__logo footer__logo-link" to="/">
              <img
                className="footer__logo-image"
                src={`${process.env.PUBLIC_URL}/Logo/Logo_bottom_mokko.png`}
                alt=""
              />
            </Link>
            <div className="footer__follow">
              <ArrowDecorTop />
              <div className="footer__follow-text">Стежити</div>

              <a
                href="https://www.instagram.com/julia_hapeka/"
                target="_blank"
                className="footer__link"
                rel="noreferrer"
              >
                <div
                  className="
                      footer__icon
                      footer__icon--instagram
                    "
                ></div>
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
                    <div
                      className="
                      footer__icon
                      footer__icon--phone
                    "
                    ></div>
                    <p className="footer__contacts">+38 063 4151853</p>
                  </a>
                </li>

                <li className="footer__item">
                  <a
                    href="https://t.me/julia_hapeka"
                    className="nav__link footer__link"
                  >
                    <div
                      className="
                      footer__icon
                      footer__icon--telegram
                    "
                    ></div>
                    <p className="footer__contacts">@julia_hapeka</p>
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
                    <div
                      className="
                      footer__icon
                      footer__icon--email
                    "
                    ></div>
                    <p className="footer__contacts">jhapeka@gmail.com</p>
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

        <button
          className={cn("footer__totop footer__link", {
            "footer__totop--hidden": !toTopVisible,
          })}
          onClick={scrollToTop}
        >
          <p>Вгору</p>
          <div className="footer__icon footer__icon--up"></div>
        </button>
      </div>
    </footer>
  );
};
