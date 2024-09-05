import { Link } from "react-router-dom";
import cn from "classnames";
import "../styles/HomePage.scss";
import "../components/ThreadDecor/ThreadDecor.scss";
import "../styles/App.scss";
import { Element } from "react-scroll";
import { ThreadDecor } from "../components/ThreadDecor/ThreadDecor";
import { PhotoSlider } from "../components/PhotoSlider";

export const HomePage = () => {
  return (
    <div className="home">
      <section className="home__main-photo">
        <div className="home__background-container">
          <h1 className="home__title">Наш спадок</h1>
        </div>
      </section>

      <Element name="about_us" className="home__section  home__about">
        <ThreadDecor />

        <h2 className="sub-title home__about-sub-title">Про нас </h2>
        <p className="home__text">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero,
          voluptatem fugiat, necessitatibus dolorum culpa vitae reprehenderit
          recusandae quo deleniti fugit ullam neque repellendus cum earum
          possimus magni voluptas illo quidem tempore veniam numquam qui
          explicabo, perspiciatis aliquam. Nihil amet modi cum vel incidunt
          aliquid deleniti possimus alias laborum, esse ipsa perspiciatis iusto
          itaque tempora, porro molestiae cumque eaque odit? Dolore dolores hic
          praesentium voluptatibus nostrum. Amet exercitationem autem, fugiat
          porro optio excepturi cum vitae perspiciatis unde laboriosam. Neque,
          sunt illo quod officia laudantium consequuntur ducimus soluta ut quasi
          doloribus maiores velit veniam, magni in sed animi quibusdam provident
          modi nam.
        </p>
      </Element>

      <Element name="catalog" className="home__section home__find">
        <ThreadDecor />

        <div className="find__photo find__photo--1"></div>

        <div className="find__photo find__photo--2"></div>

        <div className="find__text">
          <h2 className="sub-title find__sub-title">Знайди своє</h2>

          <p className="find__description">
            Вишиванка – традиційний український одяг, який відображає багату
            культуру та історію народу. Вон є символом національної ідентичності
            та гордості. Вишиті сорочки виготовляють у різних регіонах України,
            кожен з яких має свої неповторні орнаменти та кольори.
          </p>
        </div>

        <div className="find__open">
          <Link to="/catalog" className="find__open-link">
            <p className="find__open-text">до каталогу</p>
          </Link>
        </div>
      </Element>

      <Element
        id="contact"
        name="contact_us"
        className="home__section home__contact"
      >
        <ThreadDecor />
        <h2 className="sub-title home__contact-sub-title">
          Як зв'язатись з нами?
        </h2>

        <p
          className="
            description
            contact__description
          "
        >
          Ми допоможемо обрати продукт, який пасує тобі і дамо відповіді на твої
          запитання.
        </p>

        <a
          href="tel:+380%2063%20415%2018%2053"
          className="contact__phone-number"
        >
          <img src="" alt="" />
          +38 063 415 18 53
        </a>

        <PhotoSlider />
      </Element>
    </div>
  );
};
