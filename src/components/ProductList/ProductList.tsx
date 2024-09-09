import { Vyshyvanka } from "../../types/Vyshyvanka";
import "./ProductList.scss";
import "../../styles/App.scss";
import { ProductCard } from "../ProductCard";
import { useState } from "react";

type Props = {
  items: Vyshyvanka[];
};

export const VyshyvankaList: React.FC<Props> = ({ items }) => {
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
        <div className="list">
          {items.slice(0, visibleItemsCountMobile).map((item: Vyshyvanka) => (
            <div className="list__card" key={item.id}>
              <ProductCard item={item} items={items} />
            </div>
          ))}

          {visibleItemsCountMobile < items.length && (
            <div className="list__button-wrapper">
                <button className="list__button" onClick={handleShowMoreClick}>
                  Show more
                </button>
            </div>
          )}
        </div>
      ) : (
        <div className="list">
          {items.slice(0, visibleItemsCountDesktop).map((item: Vyshyvanka) => (
            <div className="list__card" key={item.id}>
              <ProductCard item={item} items={items} />
            </div>
          ))}

          {visibleItemsCountDesktop < items.length && (
            <div className="list__button-wrapper">
                <button className="list__button" onClick={handleShowMoreClick}>
                  Show more
                </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};
