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

  const [newCategoryInputOpen, setNewCategoryInputOpen] = useState(false);
  const [newSubcategoryInputOpen, setNewSubcategoryInputOpen] = useState(false);
  const [productUpdateInputOpen, setProductUpdateInputOpen] = useState(false);
  const [newProductInputOpen, setNewProductInputOpen] = useState(false);

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

  const handleOpenCloseCreateForm = () => {
    setNewProductInputOpen((prev) => !prev);
    setSelectedAdminProduct(null);
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

          {!newCategoryInputOpen && (
            <button
              className="admin__button admin__button--close"
              onClick={() => setNewCategoryInputOpen(true)}
            >
              {`додати категорію`}
            </button>
          )}

          <AddEntity<AdminCategory>
            chosenEntityName={"category"}
            adminEntities={adminCategories}
            setAdminEntities={setAdminCategories}
            selectedAdminEntity={selectedAdminCategory}
            formOpen={newCategoryInputOpen}
            setFormOpen={setNewCategoryInputOpen}
            selectedSubcategForProdCreating={null}
          />
        </ul>

        <ul className="categories__list">
          <h3 className="categories__title">Субкатегорії</h3>

          {adminSubcategories &&
            adminSubcategories.length > 0 &&
            !loadingAdminSubcategories &&
            !errorSubcategories &&
            adminSubcategories.map((subcategory) => (
              <li className="categories__item" key={subcategory.name}>
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

          {!newSubcategoryInputOpen && (
            <button
              className="admin__button admin__button--close"
              onClick={() => setNewSubcategoryInputOpen(true)}
            >
              {`додати категорію`}
            </button>
          )}

          <AddEntity<AdminSubcategory>
            chosenEntityName={"subcategory"}
            adminEntities={adminSubcategories}
            setAdminEntities={setAdminSubcategories}
            selectedAdminEntity={selectedAdminSubcategory}
            formOpen={newSubcategoryInputOpen}
            setFormOpen={setNewSubcategoryInputOpen}
            selectedSubcategForProdCreating={null}
          />
        </ul>
      </div>

      {selectedAdminSubcategory &&
        !errorProductList &&
        !loadingAdminProductList && (
          <div className="admin__bottom">
            <div className="admin__button-wrapper">
              <button
                onClick={handleOpenCloseCreateForm}
                className={cn("admin__button", {
                  "admin__button--close": !newProductInputOpen,
                  "admin__button--open": newProductInputOpen,
                })}
              >
                {newProductInputOpen ? "Close" : "Створити новий товар"}
              </button>
            </div>

            {/* CREATE product FORM*/}
            {newProductInputOpen && (
              <AddEntity<DynamicProduct>
                chosenEntityName={selectedAdminSubcategory.key}
                adminEntities={adminProductList}
                setAdminEntities={setAdminProductList}
                selectedAdminEntity={selectedAdminProduct}
                formOpen={newProductInputOpen}
                setFormOpen={setNewProductInputOpen}
                selectedSubcategForProdCreating={selectedAdminSubcategory}
              />
            )}

            {adminProductList.length === 0 ? (
              <p>Поки немає товарів</p>
            ) : (
              <div className="admin__bord">
                <AdminProductList
                  selectedAdminProduct={selectedAdminProduct}
                  adminProductList={adminProductList}
                  setSelectedAdminProduct={setSelectedAdminProduct}
                  setLoadingAdminProductDetails={setLoadingAdminProductDetails}
                  setErrorProductDetails={setErrorProductDetails}
                  setProductUpdateFormOpen={setProductUpdateInputOpen}
                />

                {selectedAdminProduct &&
                  !errorProductDetails &&
                  !loadingAdminProductDetails && (
                    <div
                      className={cn("tile", "sidebar", {
                        "sidebar--open": selectedAdminProduct,
                      })}
                    >
                      {/* EDITE product FORM*/}
                      <AddEntity<DynamicProduct>
                        chosenEntityName={selectedAdminProduct?.category}
                        adminEntities={adminProductList}
                        setAdminEntities={setAdminProductList}
                        selectedAdminEntity={selectedAdminProduct}
                        formOpen={productUpdateInputOpen}
                        setFormOpen={setProductUpdateInputOpen}
                        selectedSubcategForProdCreating={null}
                      />
                    </div>
                  )}
              </div>
            )}
          </div>
        )}

      {loadingAdminProductList && <Loader />}
    </section>
  );
};
