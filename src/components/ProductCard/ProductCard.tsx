import { Link } from 'react-router-dom';
import './ProductCard.scss';
import { Vyshyvanka } from '../../types/Vyshyvanka';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { addItem, cartSelector } from '../../redux/cart/reducerCart';

export type Props = {
    items: Vyshyvanka[];
    item: Vyshyvanka;
}

export const ProductCard: React.FC<Props> = ({ items, item }) => {
    const [selectedSize, setSelectedSize] = useState('');

    const dispatch = useAppDispatch();
    const cartItems = useAppSelector(cartSelector);

    const handleAddToCart = (product: Vyshyvanka) => {
        dispatch(addItem(product));
    }

    return (
        <div className="product">
            <div className="product__photo-container">
                <Link to="/women/vyshyvankaId" className="product__photo-link">
                    <img
                        src={`/${item.image}`}
                        alt="product`s image"
                        className="product__image"
                    />
                </Link>

                <button 
                    type="button" 
                    className="product__icon-bg product__icon-bg--favorites"
                    // onClick={() => handleAddToFavorites(item)}
                >
                    <img 
                        src={require('../../styles/icons/Favourites-Heart-Like.svg').default} 
                        alt="" 
                        className="product__icon product__icon--favorites"
                    />
                </button>
                <button 
                    type="button"
                    className="product__icon-bg product__icon-bg--cart"
                    onClick={() => {
                        handleAddToCart(item)
                    }}
                >
                    <img 
                        src={require('../../styles/icons/CartSmall.svg').default} 
                        alt="" 
                        className="product__icon product__icon--cart"
                    />
                </button>
            </div>

        <h3 className="product__title">{item.name}</h3>

        <div className="product__sizes">
            {items.filter(prod => prod.name === item.name).map(prod => (
                <button 
                    type="button" 
                    className="product__size-box"
                    key={prod.id}
                >
                    <p  className="product__size">{prod.size}</p>
                </button>
            ))}
        </div>

        <div className="product__price">{`${item.price} грн`}</div>
    </div>
    )
}

