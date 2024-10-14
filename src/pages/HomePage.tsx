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

        <div className="find__description find__description--1">
          <p className="home__text find__text">
            У вас лишилися скарби від ваших бабусь?
            <br />
            <br /> У мене, на жаль, ні. Але всі ми родом із дитинства, і всі ми
            колись станемо бабусями.
          </p>
        </div>

        <div className="find__description find__description--2">
          <p className="home__text find__text">
            І ми знаємо, що традиції оживають, коли ти у вишиванці. Це
            енергетичне відчуття важко описати, його треба тільки відчути.
            <br />
            <br />
            Вдягнути вишиванку і посміхнутися. І з середини буде проростати
            зерно щастя. Круто, еге ж?
          </p>
        </div>

        <div className="home__open find__open">
          <Link to="/catalog" className="home__open-link">
            <p className="home__open-text">до каталогу</p>
          </Link>
        </div>
      </Element>

      <Element name="bestseller" className="home__section  home__bestseller">
        <ThreadDecor />
        <h2 className="sub-title bestseller__sub-title">Бестселер</h2>

        <div className="home__photo bestseller__photo--1"></div>

        <div className="home__photo bestseller__photo--2"></div>

        <div className="home__photo bestseller__photo--3"></div>

        <div className="bestseller__description bestseller__description--1">
          <p className="home__text bestseller__text">
            Техніка виготовлення вишивки передається з покоління в покоління.
          </p>
        </div>

        <div className="bestseller__description bestseller__description--2">
          <p className="home__text bestseller__text">
            Кожен вишивальний орнамент має своє значення, відображє традиційні
            мотиви, символіку і регіональну приналежність.
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
            Вишита сорочка це не одяг.
            <br />
            Це мистецтво.
            <br />
            Це оберіг, елемент культурної спадщини, витвір національного
            декоративно-прикладного мистецтва.
            <br />
            Це любов, гордість, пам'ять.
          </p>
          <div className="home__open">
            <Link to="/catalog" className="home__open-link">
              <p className="home__open-text">Детальніше</p>
            </Link>
          </div>
        </div>

        <div className="blog__description blog__description--2">
          <p className="home__text">
            Носячи українську вишиванку люди несуть в світ українські звичаї та
            традиції. І саме в цей момент кожен, хто у вишиванці, стає
            амбасадором/послом/популяризатором української культури.
            Тож, маючи в гардеробі хоча б одну вишиванку, ви маєте для себе і
            своїх дітей, щось вічне. А це крутіше за будь-що інше, повірте.&#41;
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
