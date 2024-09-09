import { Link } from 'react-router-dom';
import './ProductCard.scss';
import { Vyshyvanka } from '../../types/Vyshyvanka';
import { useContext, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

import { FavoritesItem } from '../../types/FavoritesItem';
import { VyshyvankaDetails } from '../../types/VyshyvankaDetails';
import { AppContext } from '../appContext';

export type Props = {
    items: Vyshyvanka[];
    item: Vyshyvanka;
}

export const ProductCard: React.FC<Props> = ({ items, item }) => {
    const { setSelectedCard } = useContext(AppContext);

    return (
        <div className="card">
            <div className="card__photo-container">
                <Link 
                    to={`/catalog/women/${item.id}`} 
                    className="card__photo-link"
                    onClick={() => setSelectedCard(item)}
                >
                    <img
                        src={`/${item.image}`}
                        alt="productCard"
                        className="card__image"
                    />
                </Link>


            </div>

        <h3 className="card__title">{item.name}</h3>

        <div className="card__price">{`${item.price} грн`}</div>
    </div>
    )
}

