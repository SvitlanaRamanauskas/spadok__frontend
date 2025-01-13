import { Link } from 'react-router-dom';
import './PageNotFound.scss';

export const PageNotFound: React.FC = () => {
    return (
        <div className="not-found">
            <section className="not-found__left">
                <div className="not-found__left-image"></div>
            </section>
            <section className="not-found__right">
                <h4 className="not-found__title">4о4</h4>
                <h6 className="not-found__sub-title">Не хвилюйся, таке трапляється!</h6>
                <p className="not-found__text">Ти загубився, сторінка, на яку ти шукаєш, не існує. Ти можеш натиснуи кнопку нижче, щоб повернутись на домашню сторінку &#46;&#41;</p>
                <button 
                    className="not-found__button"
                >
                    <Link to="/" className="not-found__link">На головну</Link>
                </button>
            
            </section>
        </div>
    )
;};
