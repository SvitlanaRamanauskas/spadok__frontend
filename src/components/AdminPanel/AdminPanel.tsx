import { Dispatch, SetStateAction, useContext, useState } from "react";
import cn from "classnames";
import "./AdminPanel.scss";
import { AppContext } from "../appContext";
import { AdminCategory, AdminSubcategory } from "../../types/AdminNames";
import { AdminEntityList } from "./AdminEntityList";
import { AddEntity } from "./AddEntity";
import { DynamicProduct } from "../../types/Product";

export const AdminPanel = () => {
  const [newCategoryInputOpen, setNewCategoryInputOpen] = useState(false);
  const [newSubcategoryInputOpen, setNewSubcategoryInputOpen] = useState(false);
  const [newVyshyvankyInputOpen, setNewVyshyvankyInputOpen] = useState(false);
  const [newBooksInputOpen, setNewBooksInputOpen] = useState(false);

  const [categoryUpdateInputOpen, setCategoryUpdateInputOpen] = useState(false);
  const [subcategoryUpdateInputOpen, setSubcategoryUpdateInputOpen] =
    useState(false);
  const [productUpdateInputOpen, setProductUpdateInputOpen] = useState(false);

  const [selectedCategory, setSelectedCategory] =
    useState<AdminCategory | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] =
    useState<AdminSubcategory | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<DynamicProduct | null>(
    null
  );

  const [parentId, setParentId] = useState<string>("");

  const [loadingCategoryDetails, setLoadingCategoryDetails] = useState(false);
  const [loadingSubcategoryDetails, setLoadingSubcategoryDetails] =
    useState(false);
  const [loadingProductDetails, setLoadingProductDetails] = useState(false);

  const [errorCategoryDetails, setErrorCategoryDetails] = useState(false);
  const [errorSubcategoryDetails, setErrorSubcategoryDetails] = useState(false);
  const [errorProductDetails, setErrorProductDetails] = useState(false);

  const {
    categories,
    subcategories,
    products,
    setCategories,
    setSubcategories,
    setProducts,
  } = useContext(AppContext);

  const toggleCreateCategoryForm = () => {
    setNewCategoryInputOpen((prev) => !prev);
    setSelectedCategory(null);
  };

  const toggleCreateSubcategoryForm = () => {
    setNewSubcategoryInputOpen((prev) => !prev);
    setSelectedSubcategory(null);
  };

  const toggleCreateVyshyvankyForm = () => {
    setNewVyshyvankyInputOpen((prev) => !prev);
    setSelectedProduct(null);
  };
  const toggleCreateBooksForm = () => {
    setNewBooksInputOpen((prev) => !prev);
    setSelectedProduct(null);
  };

  return (
    <div className="admin">
      <section className="admin__board admin__board--category">
        <h3 className="admin__title">Категорії</h3>

        {!newCategoryInputOpen && (
          <div className="admin__button-wrapper">
            <button
              onClick={toggleCreateCategoryForm}
              className={cn("admin__button", {
                "admin__button--close": !newCategoryInputOpen,
                "admin__button--open": newCategoryInputOpen,
              })}
            >
              {newCategoryInputOpen ? "Close" : "Створити нову категорію"}
            </button>
          </div>
        )}

        <div className="admin__board-wrapper">
          {categories.length === 0 ? (
            <p>Поки немає категорій</p>
          ) : (
            <AdminEntityList<AdminCategory>
              entityType="category"
              selectedAdminEntity={selectedCategory}
              adminEntityList={categories}
              setSelectedAdminEntity={setSelectedCategory}
              setLoadingAdminEntityDetails={setLoadingCategoryDetails}
              setErrorEntityDetails={setErrorCategoryDetails}
              setEntityUpdateFormOpen={setCategoryUpdateInputOpen}
            />
          )}
          {/* CREATE category FORM*/}
          {newCategoryInputOpen && (
            <AddEntity<AdminCategory>
              chosenEntityName={"categories"}
              adminEntities={categories}
              setAdminEntities={
                setCategories as Dispatch<SetStateAction<AdminCategory[]>>
              }
              selectedAdminEntity={selectedCategory}
              formOpen={newCategoryInputOpen}
              setFormOpen={setNewCategoryInputOpen}
              parentId={parentId}
              setParentId={setParentId}
            />
          )}

          {selectedCategory &&
            !errorCategoryDetails &&
            !loadingCategoryDetails && (
              <div
                className={cn("tile", "sidebar", {
                  "sidebar--open": selectedCategory,
                })}
              >
                {/* EDITE category FORM*/}
                <AddEntity<AdminCategory>
                  chosenEntityName={"categories"}
                  adminEntities={categories}
                  setAdminEntities={
                    setCategories as Dispatch<SetStateAction<AdminCategory[]>>
                  }
                  selectedAdminEntity={selectedCategory}
                  formOpen={categoryUpdateInputOpen}
                  setFormOpen={setCategoryUpdateInputOpen}
                  parentId={parentId}
                  setParentId={setParentId}
                />
              </div>
            )}
        </div>
      </section>

      <section className="admin__board admin__board--subcategory">
        <h3 className="categories__title">Субкатегорії</h3>

        {!newSubcategoryInputOpen && (
          <div className="admin__button-wrapper">
            <button
              onClick={toggleCreateSubcategoryForm}
              className={cn("admin__button", {
                "admin__button--close": !newSubcategoryInputOpen,
                "admin__button--open": newSubcategoryInputOpen,
              })}
            >
              {newSubcategoryInputOpen ? "Close" : "Створити нову субкатегорію"}
            </button>
          </div>
        )}

        <div className="admin__board-wrapper">
          {subcategories.length === 0 ? (
            <p>Поки немає субкатегорій</p>
          ) : (
            <AdminEntityList<AdminSubcategory>
              entityType="subcategory"
              selectedAdminEntity={selectedSubcategory}
              adminEntityList={subcategories}
              setSelectedAdminEntity={setSelectedSubcategory}
              setLoadingAdminEntityDetails={setLoadingSubcategoryDetails}
              setErrorEntityDetails={setErrorSubcategoryDetails}
              setEntityUpdateFormOpen={setSubcategoryUpdateInputOpen}
            />
          )}

          {/* CREATE subcategory FORM*/}
          {newSubcategoryInputOpen && (
            <AddEntity<AdminSubcategory>
              chosenEntityName={"subcategories"}
              adminEntities={subcategories}
              setAdminEntities={
                setSubcategories as Dispatch<SetStateAction<AdminSubcategory[]>>
              }
              selectedAdminEntity={selectedSubcategory}
              formOpen={newSubcategoryInputOpen}
              setFormOpen={setNewSubcategoryInputOpen}
              parentId={parentId}
              setParentId={setParentId}
            />
          )}

          {selectedSubcategory &&
            !errorSubcategoryDetails &&
            !loadingSubcategoryDetails && (
              <div
                className={cn("tile", "sidebar", {
                  "sidebar--open": selectedSubcategory,
                })}
              >
                {/* EDITE subcategory FORM*/}
                <AddEntity<AdminSubcategory>
                  chosenEntityName={"subcategories"}
                  adminEntities={subcategories}
                  setAdminEntities={
                    setSubcategories as Dispatch<
                      SetStateAction<AdminSubcategory[]>
                    >
                  }
                  selectedAdminEntity={selectedSubcategory}
                  formOpen={subcategoryUpdateInputOpen}
                  setFormOpen={setSubcategoryUpdateInputOpen}
                  parentId={String(selectedSubcategory.categoryId)}
                  setParentId={setParentId}
                />
              </div>
            )}
        </div>
      </section>

      <section className="admin__board">
        <h3 className="categories__title">Товари</h3>
        <div className="admin__button-wrapper">
          <button
            onClick={toggleCreateVyshyvankyForm}
            className={cn("admin__button", {
              "admin__button--close": !newVyshyvankyInputOpen,
              "admin__button--open": newVyshyvankyInputOpen,
            })}
          >
            {newVyshyvankyInputOpen
              ? "Close"
              : "Створити новий товар (вишиванка)"}
          </button>
        </div>

        <div className="admin__button-wrapper">
          <button
            onClick={toggleCreateBooksForm}
            className={cn("admin__button", {
              "admin__button--close": !newBooksInputOpen,
              "admin__button--open": newBooksInputOpen,
            })}
          >
            {newBooksInputOpen ? "Close" : "Створити новий товар (книга)"}
          </button>
        </div>

        <div className="admin__board-wrapper">
          {/* CREATE vyshyvanky FORM*/}
          {newVyshyvankyInputOpen && (
            <AddEntity<DynamicProduct>
              chosenEntityName={"vyshyvanky"}
              adminEntities={products}
              setAdminEntities={
                setProducts as Dispatch<SetStateAction<DynamicProduct[]>>
              }
              selectedAdminEntity={selectedProduct}
              formOpen={newVyshyvankyInputOpen}
              setFormOpen={setNewVyshyvankyInputOpen}
              parentId={"1"}
              setParentId={setParentId}
            />
          )}
          {/* CREATE books FORM*/}
          {newBooksInputOpen && (
            <AddEntity<DynamicProduct>
              chosenEntityName={"books"}
              adminEntities={products}
              setAdminEntities={
                setProducts as Dispatch<SetStateAction<DynamicProduct[]>>
              }
              selectedAdminEntity={selectedProduct}
              formOpen={newBooksInputOpen}
              setFormOpen={setNewBooksInputOpen}
              parentId={"2"}
              setParentId={setParentId}
            />
          )}

          {products.length === 0 ? (
            <p>Поки немає товарів</p>
          ) : (
            <AdminEntityList<DynamicProduct>
              entityType="product"
              selectedAdminEntity={selectedProduct}
              adminEntityList={products}
              setSelectedAdminEntity={setSelectedProduct}
              setLoadingAdminEntityDetails={setLoadingProductDetails}
              setErrorEntityDetails={setErrorProductDetails}
              setEntityUpdateFormOpen={setProductUpdateInputOpen}
            />
          )}

          {selectedProduct &&
            !errorProductDetails &&
            !loadingProductDetails && (
              <div
                className={cn("tile", "sidebar", {
                  "sidebar--open": selectedProduct,
                })}
              >
                {/* EDITE product FORM*/}
                <AddEntity<DynamicProduct>
                  chosenEntityName={selectedProduct?.category}
                  adminEntities={products}
                  setAdminEntities={
                    setProducts as Dispatch<SetStateAction<DynamicProduct[]>>
                  }
                  selectedAdminEntity={selectedProduct}
                  formOpen={productUpdateInputOpen}
                  setFormOpen={setProductUpdateInputOpen}
                  parentId={String(selectedProduct.subcategoryId)}
                  setParentId={setParentId}
                />
              </div>
            )}
        </div>
      </section>
    </div>
  );
};
