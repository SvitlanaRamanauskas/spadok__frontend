import { Link } from "react-router-dom";
import './Catalog.scss';

export const Catalog = () => {
    return (
        <div className="catalog">
          <Link
            to="/catalog/women"
            className="catalog__category catalog__category--women"
          >
            <div className="catalog__category-wrapper">
              <img
                className="catalog__image"
                src={`${process.env.PUBLIC_URL}/img/women_images/cat.webp`}
                alt="for_women"
              />
              <div className="catalog__category-mask">
                <p className="catalog__category-title">жінкам</p>
              </div>
            </div>
          </Link>
          
          <Link
            to="/catalog/men"
            className="catalog__category catalog__category--men"
          >
            <div className="catalog__category-wrapper">
              <img
                className="catalog__image"
                src={`${process.env.PUBLIC_URL}/img/menVyshyvanky/1.webp`}
                alt="for_men"
              />
              <p className="catalog__category-title">чоловікам</p>
            </div>
          </Link>

          <Link
            to="/catalog/girls"
            className="catalog__category catalog__category--girls"
          >
            <div className="catalog__category-wrapper">
              <img
                className="catalog__image"
                src={`${process.env.PUBLIC_URL}/img/agnesha2.jpg`}
                alt="for_girls"
              />
              <p className="catalog__category-title">дівчатам</p>
            </div>
          </Link>

          <Link
            to="/catalog/boys"
            className="catalog__category catalog__category--boys"
          >
            <div className="catalog__category-wrapper">
              <img
                className="catalog__image"
                src={`${process.env.PUBLIC_URL}/img/50.png`}
                alt="for_boys"
              />
              <p className="catalog__category-title">хлопчикам</p>
            </div>
          </Link>

          <Link
            to="/catalog/books"
            className="catalog__category catalog__category--books"
          >
            <div className="catalog__category-wrapper">
              <img
                className="catalog__image"
                src={`${process.env.PUBLIC_URL}/img/books/Bizhu.jpeg`}
                alt="books"
              />
              <p className="catalog__category-title">книги</p>
            </div>
          </Link>
        </div>
    );
}

