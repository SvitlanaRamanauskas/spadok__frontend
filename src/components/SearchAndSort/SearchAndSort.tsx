import { useState } from "react";
import "./SearchAndSort.scss";
import cn from "classnames";
import { getSearchWith } from "../../helper/getSearch";

export function debounce(callback: (...args: string[]) => void, delay: number) {
  let timerId = 0;

  return (...args: any) => {
    window.clearTimeout(timerId);
    timerId = window.setTimeout(() => {
      callback(...args);
    }, delay);
  };
}

type Props = {
  searchParams: any;
  setSearchParams: (value: any) => void;
}

export const SearchAndSort: React.FC<Props> = ({ searchParams, setSearchParams }) => {
  const [isSelectFocused, setIsSelectFocused] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [searchActive, setSearchActive] = useState(false);

  const sort = searchParams.get("sort") || "";

  const setSearchWith = (params: any) => {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  }

  const debounceQuery = debounce(setSearchWith, 1000);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchActive(true);

    setSearchValue(event.target.value);
    debounceQuery({ query: event.target.value });
  };

  const handleDeleteInput = () => {
    setSearchWith({ query: null });
    setSearchValue('');
    setSearchActive(false);
  };

  const handleSortBy = (sortBy: string) => {
    const params = new URLSearchParams(searchParams);

    if (sort === "") {
      params.set("sort", sortBy);
    } else if (sort === sortBy) {
      params.delete("sort");
    } else {
      params.set("sort", sortBy);
    }

    setSearchParams(params);
  };

  const handleSelectBlur = () => {
    setIsSelectFocused(false);
  };

  const handleSelectFocus = () => {
    setIsSelectFocused(!isSelectFocused);
  };


  return (
    <>
      <div className="search">
        {!searchActive ? (
          <img
            src={require("../../styles/icons/Search.svg").default}
            alt="search"
            className="search__icon"
          />
        ) : (
          <button className="search__button--close" onClick={handleDeleteInput}>
            <img
              src={require("../../styles/icons/Close.svg").default}
              alt="search"
              className="search__icon"
            />
          </button>
        )}
        
        <input 
          type="search" 
          className="search__input" 
          placeholder="пошук"
          value={searchValue}
          onChange={handleInputChange}
         />
      </div>

      <div className="sort">
        <div
          className={cn("sort__input", {
            "sort__input--focused": isSelectFocused,
          })}
        >
          <label htmlFor="sort" className="sort__input-label">
            Обрати за
          </label>

          <select
            className="sort__select"
            name="sort-by"
            id="sort"
            onChange={(e) => {
              handleSortBy(e.target.value);
            }}
            onClick={handleSelectFocus}
            onBlur={handleSelectBlur}
          >
            <option className="sort__option" value="name">
              алфавитом
            </option>
            <option className="sort__option" value="priceFromLow">
              дешевші
            </option>
            <option className="sort__option" value="priceFromHigh">
              дорожчи
            </option>
          </select>
        </div>
      </div>
    </>
  );
};
