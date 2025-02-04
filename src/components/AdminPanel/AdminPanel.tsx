import { useEffect, useState } from "react";
import cn from "classnames";
import {
  createAdminCategory,
  fetchCategoriesList,
  fetchProductsBySubcategory,
  fetchSubcategoriesByCategory,
} from "../../helper/fetch";
import "./AdminPanel.scss";
import { Product } from "../../types/Product";
import { AdminProductDetails } from "./AdminProductDetails";
import { AdminProductList } from "./AdminProductList";
import { Loader } from "../Loader";
import { AdminCategory, AdminSubcategory } from "../../types/AdminNames";

export const AdminPanel = () => {
  const [adminCategories, setAdminCategories] = useState<AdminCategory[]>([]);
  const [adminSubcategories, setAdminSubcategories] = useState<
    AdminSubcategory[]
  >([]);
  const [adminProductList, setAdminProductList] = useState<Product[] | []>([]);

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
    useState<Product | null>(null);

  const [newCategoryInputOpen, setNewCategoryInputOpen] = useState(false);

  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryKey, setNewCategoryKey] = useState("");
  const [newCategoryId, setNewCategoryId] = useState("");

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

  //#region handlers-Input

  const handleInputCategoryChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewCategoryName(event.target.value);
  };

  const handleInputCategoryKeyChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewCategoryKey(event.target.value);
  };

  const handleInputCategoryIdChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewCategoryId(event.target.value);
  };

  //#endregion

  const addCategory = () => {
    return createAdminCategory({
      name: newCategoryName,
      key: newCategoryKey,
      id: "4",
    }).then((newAdminCategory) =>
      setAdminCategories((currentCategories) => [
        ...currentCategories,
        newAdminCategory,
      ])
    );
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    addCategory();
    setNewCategoryInputOpen(false);
    setNewCategoryName("");
    setNewCategoryKey("");
    setNewCategoryId("");
  };

  const handleReset = () => {
    setNewCategoryName("");
    setNewCategoryKey("");
    setNewCategoryId("");
  };

  return (
    <section className="admin">
      {loadingAdminCategories && <Loader />}

      <ul className="admin__categories categories__list">
        {adminCategories.map((category) => (
          <li className="categories__item" key={category.name}>
            <button
              className={cn("categories__link", {
                "categories__link--active": selectedAdminCategory === category,
              })}
              onClick={() => handleOpenCloseAdminSubcategory(category)}
            >
              {category.name}
            </button>
          </li>
        ))}
      </ul>

      {newCategoryInputOpen && (
        <form 
          className="admin__categories-form" 
          onSubmit={handleSubmit}
          onReset={handleReset}
        >
          <input
            type="text"
            value={newCategoryName}
            onChange={handleInputCategoryChange}
            placeholder="Category Name"
          />
          <input
            type="text"
            value={newCategoryKey}
            onChange={handleInputCategoryKeyChange}
             placeholder="Category Key"
          />
          <input
            type="text"
            value={newCategoryId}
            onChange={handleInputCategoryIdChange}
             placeholder="Category Id"
          />

          <div className="admin__categories-buttons">
            <button className="admin__categories-button" type="submit">
              Зберегти
            </button>
            <button className="admin__categories-button" type="reset">
              Очистити
            </button>
          </div>
        </form>
      )}

      {!newCategoryInputOpen && (
        <button
          className="admin__button admin__button--close"
          onClick={() => setNewCategoryInputOpen(true)}
        >
          додати категорію
        </button>
      )}

      {adminSubcategories.length > 0 &&
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

      {adminProductList.length > 0 &&
        !errorProductList &&
        !loadingAdminProductList && (
          <div className="admin__container">
            <AdminProductList
              selectedAdminProduct={selectedAdminProduct}
              adminProductList={adminProductList}
              setSelectedAdminProduct={setSelectedAdminProduct}
              setLoadingAdminProductDetails={setLoadingAdminProductDetails}
              setErrorProductDetails={setErrorProductDetails}
            />

            {!!selectedAdminProduct &&
              !errorProductDetails &&
              !loadingAdminProductDetails && (
                <AdminProductDetails
                  selectedAdminProduct={selectedAdminProduct}
                  setAdminProductList={setAdminProductList}
                />
              )}
          </div>
        )}

      {adminProductList.length === 0 &&
        selectedAdminSubcategory &&
        !errorProductList &&
        !loadingAdminProductList && <p>Поки немає товарів</p>}

      {loadingAdminProductList && <Loader />}
    </section>
  );
};
