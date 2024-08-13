import { Link } from "react-router-dom";
import cn from "classnames";
import "../styles/HomePage.scss";
import { Element } from "react-scroll";

export const HomePage = () => {
  return (
    <div className="home">
      <section>
        <div className="home__background-container">
          <h1 className="home__title">Nash_Spadok</h1>
        </div>
      </section>

      <section className="home__about">
        <h2 className="sub-title home__about-sub-title">Про нас </h2>
        <p className="home__text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero, voluptatem fugiat, necessitatibus dolorum culpa vitae reprehenderit recusandae quo deleniti fugit ullam neque repellendus cum earum possimus magni voluptas illo quidem tempore veniam numquam qui explicabo, perspiciatis aliquam. Nihil amet modi cum vel incidunt aliquid deleniti possimus alias laborum, esse ipsa perspiciatis iusto itaque tempora, porro molestiae cumque eaque odit? Dolore dolores hic praesentium voluptatibus nostrum. Amet exercitationem autem, fugiat porro optio excepturi cum vitae perspiciatis unde laboriosam. Neque, sunt illo quod officia laudantium consequuntur ducimus soluta ut quasi doloribus maiores velit veniam, magni in sed animi quibusdam provident modi nam.</p>
      </section>
      <section className="home__catalog">
        <h2 className="sub-title home__catalog-sub-title">Каталог</h2>
        <div className="topic__container">
          <Link to="/women" className="topic topic--women">
            <div className="topic__background topic__background--women">
              {/* <img className="category__image" src="" alt="for_women" /> */}
              <div className="topic-wrapper">
                <p className="topic">жіночі вишиванки</p>
              </div>
            </div>
          </Link>
          <Link to="/men" className="topic topic--men">
            <div className="topic__background topic__background--men">
              <div className="topic-wrapper">
                <p className="v">чоловічи вишиванки</p>
              </div>
            </div>
          </Link>
          <Link to="/girls" className="topic topic--girls">
            <div className="topic__background topic__background--girls">
              <div className="topic__title-wrapper">
                <p className="topic__title">вишиванки дівчатам</p>
              </div>
            </div>
          </Link>
          <Link to="/boys" className="topic topic--boys">
            <div className="topic__background topic__background--boys">
              <div className="topic__title-wrapper">
                <p className="topic__title">вишиванки хлопчикам</p>
              </div>
            </div>
          </Link>
          <Link to="/books" className="topic topic--books">
            <div className="topic__background topic__background--books">
              <div className="topic__title-wrapper">
                <p className="topic__title">книги</p>
              </div>
            </div>
          </Link>
        </div>
      </section>

      <Element name="contact_us">
        <section id="contact" className="home__contact">
            <h2 className="sub-title home__contact-sub-title">contact us</h2>

            <p
              className="
              description
              contact__description
            "
            >
              We will help you choose a product that suits you and answer your
              other questions
            </p>

            <a href="tel:+380%2063%20415%2018%2053" className="contact__phone-number">

              <img src="" alt="" />
              +38 063 415 18 53
            </a>

        </section>
      </Element>
    </div>
  );
};
