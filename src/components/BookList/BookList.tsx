import { Link } from "react-router-dom";
import './BookList.scss';
import '../../styles/App.scss';
import { Book } from "../../types/Book";
import { BookCard } from "../BookCard";

type Props = {
    items: Book[];
}

export const BookList: React.FC<Props> = ({ items }) => {
    return (
        <div className="list">
            {items.map((item: Book) => (
                <div 
                    className="list__card"
                    key={item.id}
                >
                   <BookCard item={item} />
                </div>
            ))}
        </div>
    );
}