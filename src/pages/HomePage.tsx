import { Link } from 'react-router-dom';
import '../styles/HomePage.scss';

export const HomePage = () => {
   return  (
      <div className="home">
         <section className="home__catalog">
            <h2 className="title home__title">
               Каталог
            </h2>
            <div className="category__container">
               <Link to="/women" className="category category--women">
                  <img className="category__image" src="" alt="for_women" />
                  <p className="category__title">жіночі вишиванки</p>
               </Link>
               <Link to="/men" className="category category--men">
                  <img className="category__image" src="" alt="for_men" />
                  <p className="category__title">чоловічи вишиванки</p>
               </Link>
               <Link to="/girls" className="category category--girls">
                  <img className="category__image" src="" alt="for_girls" />
                  <p className="category__title">вишиванки дівчатам</p>
               </Link>
               <Link to="/boys" className="category category--boys">
                  <img className="category__image" src="" alt="for_boys" />
                  <p className="category__title">вишиванки хлопцям</p>
               </Link>
               <Link to="/books" className="category category--books">
                  <img className="category__image" src="" alt="books" />
                  <p className="category__title">книги</p>
               </Link>
            </div>
         </section>
      </div>
   )
}
