import { Link } from "react-router-dom";
import "./BookList.scss";
import "../../styles/App.scss";
import { Book } from "../../types/Book";
import { BookCard } from "../BookCard";
import { useState } from "react";

type Props = {
  items: Book[];
};

export const BookList: React.FC<Props> = ({ items }) => {
  const [visibleItemsCountMobile, setVisibleItemsCountMobile] = useState(6);
  const [visibleItemsCountDesktop, setVisibleItemsCountDesktop] = useState(9);

  const innerWidth = window.innerWidth;

  const handleShowMoreClick = () => {
    if (innerWidth < 1200) {
      setVisibleItemsCountMobile((prevCount) => {
        const newCount = prevCount + 6;
        return newCount >= items.length ? items.length : newCount;
      });
    } else {
      setVisibleItemsCountDesktop((prevCount) => {
        const newCount = prevCount + 9;
        return newCount >= items.length ? items.length : newCount;
      });
    }
  };
  return (
    <>
      {innerWidth < 1200 ? (
        <div className="list__book">
          {items.slice(0, visibleItemsCountMobile).map((item: Book) => (
            <div className="list__book-card" key={item.id}>
              <BookCard item={item} />
            </div>
          ))}

          {visibleItemsCountMobile < items.length && (
            <div className="list__book-button-wrapper">
              <button className="list__book-button" onClick={handleShowMoreClick}>
                Show more
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="list__book">
          {items.slice(0, visibleItemsCountDesktop).map((item: Book) => (
            <div className="list__book-card" key={item.id}>
              <BookCard item={item} />
            </div>
          ))}

          {visibleItemsCountDesktop < items.length && (
            <div className="list__book-button-wrapper">
              <button className="list__book-button" onClick={handleShowMoreClick}>
                Show more
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};
