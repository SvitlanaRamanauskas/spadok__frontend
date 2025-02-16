import { useEffect, useState } from "react";
import cn from "classnames";
import {
  createAdminCategory,
  fetchCategoriesList,
  fetchProductsBySubcategory,
  fetchSubcategoriesByCategory,
} from "../../helper/fetch";
import "./AdminPanel.scss";
import { DynamicProduct } from "../../types/Product";
import { AdminProductList } from "./AdminProductList";
import { Loader } from "../Loader";
import { AdminCategory, AdminSubcategory } from "../../types/AdminNames";
import { AddEntity } from "./AddEntity";
import { Vyshyvanka } from "../../types/Vyshyvanka";

export const AdminPanel = () => {
  const [adminCategories, setAdminCategories] = useState<AdminCategory[]>([]);
  const [adminSubcategories, setAdminSubcategories] = useState<
    AdminSubcategory[]
  >([]);
  const [adminProductList, setAdminProductList] = useState<
    DynamicProduct[] | []
  >([]);

  const [errorCategories, setErrorCategories] = useState(false);
  const [errorSubcategories, setErrorSubcategories] = useState(false);
  const [errorProductList, setErrorProductList] = useState(false);
  const [errorProductDetails, setErrorProductDetails] = useState(false);

  const [loadingAdminCategories, setLoadingAdminCategories] = useState(false);
  const [loadingAdminSubcategories, setLoadingAdminSubcategories] =
    useState(false);
  const [loadingAdminProductList, setLoadingAdminProductList] = useState(false);
  const [loadingAdminProductDetails, setLoadingAdminProductDetails] =
    useState(false);

  const [selectedAdminCategory, setSelectedAdminCategory] =
    useState<AdminCategory | null>(null);
  const [selectedAdminSubcategory, setSelectedAdminSubcategory] =
    useState<AdminSubcategory | null>(null);
  const [selectedAdminProduct, setSelectedAdminProduct] =
    useState<DynamicProduct | null>(null);

  const [openCreateProduct, setOpenCreateProduct] = useState(false);

  useEffect(() => {
    setLoadingAdminCategories(true);

    fetchCategoriesList()
      .then((data) => {
        setAdminCategories(data);
      })
      .catch((error) => {
        setErrorCategories(true);
      })
      .finally(() => setLoadingAdminCategories(false));
  }, []);

  const handleOpenCloseAdminSubcategory = (category: AdminCategory) => {
    if (!category) {
      return;
    }
    if (selectedAdminCategory === category) {
      setSelectedAdminCategory(null);
      setSelectedAdminSubcategory(null);
      setSelectedAdminProduct(null);
      setAdminSubcategories([]);
      setAdminProductList([]);

      return;
    }

    setLoadingAdminSubcategories(true);
    setSelectedAdminCategory(null);
    setSelectedAdminSubcategory(null);
    setSelectedAdminProduct(null);
    setAdminSubcategories([]);
    setAdminProductList([]);
    // setNewCategoryInputOpen(false);

    fetchSubcategoriesByCategory(category)
      .then((data) => {
        setAdminSubcategories(data);
        setSelectedAdminCategory(category);
      })
      .catch((error) => {
        setErrorSubcategories(true);
      })
      .finally(() => setLoadingAdminSubcategories(false));
  };

  const handleOpenCloseProductsList = (subcategory: AdminSubcategory) => {
    if (!subcategory) {
      return;
    }
    if (selectedAdminSubcategory === subcategory) {
      setSelectedAdminSubcategory(null);
      setAdminProductList([]);
      setErrorProductList(false);
      return;
    }

    setLoadingAdminProductList(true);
    setErrorProductList(false);
    setAdminProductList([]);
    setSelectedAdminSubcategory(null);

    if (!subcategory.key) {
      setLoadingAdminProductList(false);
      return;
    }

    fetchProductsBySubcategory(subcategory.key)
      .then((data) => {
        setAdminProductList(data);
        setSelectedAdminSubcategory(subcategory);
      })
      .catch(() => {
        setErrorProductList(true);
      })
      .finally(() => setLoadingAdminProductList(false));
  };

  const handleOpenCloseProductForm = () => {
    if (openCreateProduct) {
      setOpenCreateProduct(false);
    } else {
      setOpenCreateProduct(true);
    }
  };

  return (
    <section className="admin">
      {loadingAdminCategories && <Loader />}

      <div className="admin__top">
        <ul className="categories__list">
          <h3 className="categories__title">Категорії</h3>
          {adminCategories.map((category) => (
            <li className="categories__item" key={category.name}>
              <button
                className={cn("categories__link", {
                  "categories__link--active":
                    selectedAdminCategory === category,
                })}
                onClick={() => handleOpenCloseAdminSubcategory(category)}
              >
                {category.name}
              </button>
            </li>
          ))}
        </ul>

        <AddEntity<AdminCategory>
          chosenCategory={"category"}
          adminEntities={adminCategories}
          setAdminEntities={setAdminCategories}
          selectedAdminEntity={selectedAdminCategory}
        />

        <ul className="categories__list">
          <h3 className="categories__title">Субкатегорії</h3>
          {adminSubcategories &&
            adminSubcategories.length > 0 &&
            !loadingAdminSubcategories &&
            !errorSubcategories &&
            adminSubcategories.map((subcategory) => (
              <li
                className="admin__subcategories categories__item"
                key={subcategory.name}
              >
                <button
                  className={cn("categories__link", {
                    "categories__link--active":
                      selectedAdminSubcategory === subcategory,
                  })}
                  onClick={() => handleOpenCloseProductsList(subcategory)}
                >
                  {subcategory.name}
                </button>
              </li>
            ))}
        </ul>

        <AddEntity<AdminSubcategory>
          chosenCategory={"subcategory"}
          adminEntities={adminSubcategories}
          setAdminEntities={setAdminSubcategories}
          selectedAdminEntity={selectedAdminSubcategory}
        />
      </div>

      <button
        onClick={handleOpenCloseProductForm}
        className={cn("admin__button", {
          "admin__button--close": !openCreateProduct,
          "admin__button--open": openCreateProduct,
        })}
      >
        {openCreateProduct ? "Close" : "Створити новий товар"}
      </button>

      {adminProductList.length > 0 &&
        !errorProductList &&
        !loadingAdminProductList && (
          <div className="admin__bottom">
            <AdminProductList
              selectedAdminProduct={selectedAdminProduct}
              adminProductList={adminProductList}
              setSelectedAdminProduct={setSelectedAdminProduct}
              setLoadingAdminProductDetails={setLoadingAdminProductDetails}
              setErrorProductDetails={setErrorProductDetails}
            />

            {(!!selectedAdminProduct || openCreateProduct) &&
              !errorProductDetails &&
              !loadingAdminProductDetails && (
                <div
                  className={cn("tile", "sidebar", {
                    "sidebar--open": selectedAdminProduct || openCreateProduct,
                  })}
                >
                  <AddEntity<DynamicProduct>
                    chosenCategory={selectedAdminProduct?.category}
                    adminEntities={adminProductList}
                    setAdminEntities={setAdminProductList}
                    selectedAdminEntity={selectedAdminProduct}
                  />
                </div>
              )}
          </div>
        )}

      {openCreateProduct && (
        <>
          {adminCategories.map((category) => (
            <AddEntity<DynamicProduct>
              chosenCategory={category.name}
              adminEntities={adminProductList}
              setAdminEntities={setAdminProductList}
              selectedAdminEntity={selectedAdminProduct}
            />
          ))}
        </>
      )}

      {adminProductList.length === 0 &&
        selectedAdminSubcategory &&
        !errorProductList &&
        !loadingAdminProductList && <p>Поки немає товарів</p>}

      {loadingAdminProductList && <Loader />}
    </section>
  );
};
