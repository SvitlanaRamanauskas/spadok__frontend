import { Link } from "react-router-dom";
import { Vyshyvanka } from "../../types/Vyshyvanka";
import './VyshyvankaList.scss';
import '../../styles/App.scss';

type Props = {
    items: Vyshyvanka[]
}

export const VyshyvankaList: React.FC<Props> = ({ items }) => {
    return (
        <div className="vyshyvanka__list">
        {items.map((item: Vyshyvanka) => (
            <div 
                className="vyshyvanka__card"
                key={item.id}
            >
                <div className="vyshyvanka__product">
                    <Link to="/women/vyshyvankaId" className="product__photo-link">
                        <img 
                            src={`/${item.image}`} 
                            alt="product`s image" 
                            className="product__image"
                         />
                    </Link>

                    <h3 className="product__title">{item.name}</h3>

                    <div className="product__sizes">
                        {items.filter(prod => prod.name === item.name).map(prod => (
                            <button type="button" className="product__size-box">
                                <p  className="product__size">{prod.size}</p>
                            </button>
                        ))}
                    </div>

                    <div className="product__price">{`${item.price} грн`}</div>
                </div>
            </div>
        ))}
    </div>
    );
}