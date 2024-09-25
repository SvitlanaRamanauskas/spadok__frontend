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
                src="/img/women_images/Solomia.jpeg"
                alt="for_women"
              />
              <p className="catalog__category-title">жінкам</p>
            </div>
          </Link>
          
          <Link
            to="/catalog/men"
            className="catalog__category catalog__category--men"
          >
            <div className="catalog__category-wrapper">
              <img
                className="catalog__image"
                src="/img/women_images/Solomia.jpeg"
                alt="for_men"
              />
              <p className="catalog__category-title">чоловикам</p>
            </div>
          </Link>

          <Link
            to="/catalog/girls"
            className="catalog__category catalog__category--girls"
          >
            <div className="catalog__category-wrapper">
              <img
                className="catalog__image"
                src="/img/women_images/Solomia.jpeg"
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
                src="/img/women_images/Solomia.jpeg"
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
                src="/img/women_images/Solomia.jpeg"
                alt="books"
              />
              <p className="catalog__category-title">книги</p>
            </div>
          </Link>
        </div>
    );
}

