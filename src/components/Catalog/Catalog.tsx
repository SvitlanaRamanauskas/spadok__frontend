import { Link } from "react-router-dom";
import "./Catalog.scss";
import { useEffect, useState } from "react";
import { fetchSubcategoriesList } from "../../helper/fetch";
import { Loader } from "../Loader";
import { AdminSubcategory } from "../../types/AdminNames";

export const Catalog = () => {
  const [subcategories, setSubcategories] = useState<AdminSubcategory[]>([]);
  const [subcategoriesError, setSubcategoriesError] = useState(false);
  const [subcategoriesLoading, setSubcategoriesLoading] = useState(false);

  useEffect(() => {
    setSubcategoriesLoading(true);
    fetchSubcategoriesList()
      .then((data) => setSubcategories(data))
      .catch(() => setSubcategoriesError(true))
      .finally(() => {
        setSubcategoriesError(false);
        setSubcategoriesLoading(false);
      });
  }, []);
  
  return (
    <div className="catalog">
      {subcategoriesLoading && !subcategoriesError && <Loader />}

      {!subcategoriesLoading && subcategoriesError && (
        <p className="catalog__error">Error loading Subcategories Catalog</p>
      )}

      {subcategories.map((subcategory) => (
        <Link
          to={`/catalog/${subcategory.key}`}
          className="catalog__category"
        >
          <div className="catalog__category-wrapper">
            <img
              className="catalog__image"
              src={subcategory.image}
              alt={`for_${subcategory.key}`}
            />
            <div className="catalog__category-mask">
              <p className="catalog__category-title">{subcategory.name}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};
