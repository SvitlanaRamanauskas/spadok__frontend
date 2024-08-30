import { Link } from 'react-router-dom';
import './BookCard.scss';
import { useState } from 'react';
import { Book } from '../../types/Book';

export type Props = {
    item: Book;
}

export const BookCard: React.FC<Props> = ({ item }) => {

    return (
        <div className="card">
            <div className="card__photo-container">
                <Link to={`/women/${item.id}`} className="card__photo-link">
                    <img
                        src={`/${item.image}`}
                        alt="product`s image"
                        className="card__image"
                    />
                </Link>


            </div>

        <h3 className="card__title">{item.title}</h3>

        <div className="card__price">{`${item.price} грн`}</div>
    </div>
    )
}

