import { useEffect, useMemo, useState } from "react";
import cn from "classnames";
import {
  fetchCategoriesNameList,
  fetchProductsBySubcategory,
  fetchSubcategoriesNameListByCategory,
  getProductById,
} from "../../helper/fetch";
import "./AdminPanel.scss";
import { Product } from "../../types/Product";
import { AdminProductDetails } from "./AdminProductDetails";

export const AdminPanel = () => {
  const [adminCategories, setAdminCategories] = useState<string[]>([]);
  const [adminSubcategories, setAdminSubcategories] = useState<string[]>([]);
  const [adminProductList, setAdminProductList] = useState<Product[] | []>([]);

  const [errorCategory, setErrorCategory] = useState(false);
  const [errorSubcategory, setErrorSubcategory] = useState(false);
  const [errorProductList, setErrorProductList] = useState(false);

  const [loadingAdminCategories, setLoadingAdminCategories] = useState(false);
  const [loadingAdminSubcategories, setLoadingAdminSubcategories] =
    useState(false);
  const [loadingAdminProductList, setLoadingAdminProductList] = useState(false);

  const [selectedAdminCategory, setSelectedAdminCategory] =
    useState<string>("");
  const [selectedAdminSubcategory, setSelectedAdminSubcategory] =
    useState<string>("");
  const [selectedAdminProduct, setSelectedAdminProduct] =
    useState<Product | null>(null);

  const [subcategoriesVisible, setSubcategoriesVisible] = useState(false);
  const [adminProductListVisible, setAdminProductListVisible] = useState(false);

  useEffect(() => {
    setLoadingAdminCategories(true);

    fetchCategoriesNameList()
      .then((data) => {
        setAdminCategories(data);
      })
      .catch((error) => {
        setErrorCategory(true);
      })
      .finally(() => setLoadingAdminCategories(false));
  }, []);

  const handleOpenCloseAdminSubcategory = (categoryName: string) => {
    if (selectedAdminCategory === categoryName) {
      setSelectedAdminCategory("");
      setSelectedAdminSubcategory("");
      setSelectedAdminProduct(null);
      setAdminSubcategories([]);
      setAdminProductList([]);
      setSubcategoriesVisible(false);
      setAdminProductListVisible(false);
      return;
    }

    setLoadingAdminSubcategories(true);
    setSubcategoriesVisible(false);
    setSelectedAdminCategory("");
    setSelectedAdminSubcategory("");
    setSelectedAdminProduct(null);
    setAdminSubcategories([]);
    setAdminProductList([]);
    setSubcategoriesVisible(false);
    setAdminProductListVisible(false);

    fetchSubcategoriesNameListByCategory(categoryName)
      .then((data) => {
        setAdminSubcategories(data);
        setSubcategoriesVisible(true);
        setSelectedAdminCategory(categoryName);
      })
      .catch((error) => {
        setErrorSubcategory(true);
      })
      .finally(() => setLoadingAdminSubcategories(false));
  };

  const handleOpenCloseProductsList = (subcategory: string) => {
    if (selectedAdminSubcategory === subcategory) {
      setSelectedAdminSubcategory("");
      setAdminProductList([]);
      setAdminProductListVisible(false);
      return;
    }

    setLoadingAdminProductList(true);
    setAdminProductListVisible(false);
    setSelectedAdminSubcategory("");

    const subcategoryKeyMap: Record<string, string> = {
      жінкам: "women",
      чоловікам: "men",
      хлопчикам: "boys",
      дівчатам: "girls",
      книги: "books",
    };

    const mappedKey = subcategoryKeyMap[subcategory] || "";

    if (!mappedKey) {
      setLoadingAdminProductList(false);
      return;
    }

    fetchProductsBySubcategory(mappedKey)
      .then((data) => {
        setAdminProductList(data);
        setAdminProductListVisible(true);
        setSelectedAdminSubcategory(subcategory);
      })
      .catch(() => {
        setErrorProductList(true);
      })
      .finally(() => setLoadingAdminProductList(false));
  };

  const handleOpenCloseProduct = (product: Product) => {
    if (selectedAdminProduct?.id === product.id) {
        setSelectedAdminProduct(null);
        return;
    }

    setSelectedAdminProduct(product); // Set the product immediately
    fetchProductDetails(product.id);
  };
  const fetchProductDetails = useMemo(
    () => (id: string) => {
      getProductById(id)
        .then((data) => {
          if (data) {
            setSelectedAdminProduct(data); // Update product with fetched details
          }
        })
        .catch((error) => {
          console.error("Failed to fetch product details:", error);
        });
    },
    [] // Empty array ensures this function doesn't get recreated on every render
  );
  console.log(selectedAdminProduct);

  return (
    <section className="admin">
      <ul className="admin__categories categories__list">
        {adminCategories.map((category) => (
          <li className="categories__item" key={category}>
            <button
              className={cn("categories__link", {
                "categories__link--active": selectedAdminCategory === category,
              })}
              onClick={() => handleOpenCloseAdminSubcategory(category)}
            >
              {category}
            </button>
          </li>
        ))}
      </ul>

      {subcategoriesVisible &&
        adminSubcategories.map((subcategory) => (
          <li
            className="admin__subcategories categories__item"
            key={subcategory}
          >
            <button
              className={cn("categories__link", {
                "categories__link--active":
                  selectedAdminSubcategory === subcategory,
              })}
              onClick={() => handleOpenCloseProductsList(subcategory)}
            >
              {subcategory}
            </button>
          </li>
        ))
      }

      <div className="admin__container">
        <div className={cn("admin__side", { "admin__side-open": !selectedAdminProduct })}>
          {adminProductListVisible && (
            <table className="admin-product__list">
              <thead className="admin__thead">
                <tr className="admin__thead-tr">
                  <th className="admin__thead-tr-th">id</th>
                  <th className="admin__thead-tr-th">title</th>
                  <th className="admin__thead-tr-th">open/close</th>
                </tr>
              </thead>

              <tbody className="admin__tbody">
                {adminProductList.map((product) => (
                    <tr className="admin__tbody-tr" key={product.id}>
                    <td className="admin__tbody-tr-td">{product.id}</td>
                    <td className="admin__tbody-tr-td">{product.title}</td>
                    <td className="admin__tbody-tr-td">
                      <button
                        onClick={() => handleOpenCloseProduct(product)}
                        className={cn("admin-product__button", {
                            "admin-product__button--open" : selectedAdminProduct?.id !== product.id,
                            "admin-product__button--close" : selectedAdminProduct?.id === product.id,
                        })}
                      >
                        {selectedAdminProduct?.id === product.id ? "Close" : "Open"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {!!selectedAdminProduct && (
          <AdminProductDetails selectedAdminProduct={selectedAdminProduct} />
        )}
      </div>
    </section>
  );
};
