import "../../styles/button.scss";
import "./List.scss";
import "../../styles/App.scss";
import { ProductCard } from "../ProductCard";
import { useState } from "react";
import { SearchAndSort } from "../SearchAndSort";
import { useSearchParams } from "react-router-dom";
import { getPreparedVyshyvanky } from "../../helper/fetch";
import { Product } from "../../types/Product";


type Props = {
  items: Product[];
};

export const List: React.FC<Props> = ({ items }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [visibleItemsCountMobile, setVisibleItemsCountMobile] = useState(4);
  const [visibleItemsCountDesktop, setVisibleItemsCountDesktop] = useState(6);

  const innerWidth = window.innerWidth;

  const handleShowMoreClick = () => {
    if (innerWidth < 1200) {
      setVisibleItemsCountMobile((prevCount) => {
        const newCount = prevCount + 4;
        return newCount >= items.length ? items.length : newCount;
      });
    } else {
      setVisibleItemsCountDesktop((prevCount) => {
        const newCount = prevCount + 6;
        return newCount >= items.length ? items.length : newCount;
      });
    }
  };

  const preparedProducts = getPreparedVyshyvanky(items, Object.fromEntries(searchParams));

  return (
    <>
      <SearchAndSort 
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />

      {innerWidth < 1200 ? (
        <div className="list">
          {preparedProducts.slice(0, visibleItemsCountMobile).map((item: Product) => (
            <div className="list__card" key={item.id}>
              <ProductCard item={item} productsFromServer={items} />
            </div>
          ))}

          {visibleItemsCountMobile < items.length && (
            <div className="list__button-wrapper">
                <button className="list__button button" onClick={handleShowMoreClick}>
                  Більше товарів
                </button>
            </div>
          )}
        </div>
      ) : (
        <div className="list">
          {preparedProducts.slice(0, visibleItemsCountDesktop).map((item: Product) => (
            <div className="list__card" key={item.id}>
              <ProductCard item={item} productsFromServer={items} />
            </div>
          ))}

          {visibleItemsCountDesktop < items.length && (
            <div className="list__button-wrapper">
                <button className="list__button button" onClick={handleShowMoreClick}>
                  Більше товарів
                </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};
