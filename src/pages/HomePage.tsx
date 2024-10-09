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

      <Element name="catalog" className="home__section home__find">
        <ThreadDecor />

        <div className="home__photo find__photo--1"></div>

        <div className="home__photo find__photo--2"></div>

        <h2 className="sub-title find__sub-title">Знайди своє</h2>

        <div className="find__description">
          <p className="home__text find__text">
            Вишиванка – традиційний український одяг, який відображає багату
            культуру та історію народу. Вон є символом національної ідентичності
            та гордості. Вишиті сорочки виготовляють у різних регіонах України,
            кожен з яких має свої неповторні орнаменти та кольори.
          </p>
          <div className="home__open">
            <Link to="/catalog" className="home__open-link">
              <p className="home__open-text">до каталогу</p>
            </Link>
          </div>
        </div>
      </Element>

      <Element name="bestseller" className="home__section  home__bestseller">
        <ThreadDecor />
        <h2 className="sub-title bestseller__sub-title">Бестселер</h2>

        <div className="home__photo bestseller__photo--1"></div>

        <div className="home__photo bestseller__photo--2"></div>

        <div className="home__photo bestseller__photo--3"></div>


        <div className="bestseller__description">
          <p className="home__text bestseller__text">
            Техніка виготовлення вишивки передається з покоління в покоління.
          </p>

          <div className="home__open">
            <Link to="/catalog" className="home__open-link">
              <p className="home__open-text">Переглянути</p>
            </Link>
          </div>
        </div>
      </Element>

      <Element name="about_us" className="home__section  home__blog">
        <ThreadDecor />

        <div className="home__photo blog__photo--1"></div>

        <div className="home__photo blog__photo--2"></div>

        <h2 className="sub-title blog__sub-title">Вишивані історії</h2>

        <div className="blog__description blog__description--1">
          <p className="home__text">
            Техніка виготовлення вишивки передається з покоління в покоління.Вишиванка – це
            не просто одяг, а оберіг, який захищає свого власника від негативної
            енергії та злих сил.
          </p>
          <div className="home__open">
            <Link to="/catalog" className="home__open-link">
              <p className="home__open-text">Детальніше</p>
            </Link>
          </div>
        </div>

        <div className="blog__description blog__description--2">
          <p className="home__text">
            Сьогодні вишиванка набула популярності в усьому світі, ставши модним
            трендом, який поєднує традиційні мотиви з сучасними стилями.
          </p>
          <div className="home__open">
            <Link to="/catalog" className="home__open-link">
              <p className="home__open-text">Детальніше</p>
            </Link>
          </div>
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
