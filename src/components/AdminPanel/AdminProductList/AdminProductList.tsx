import { useMemo } from "react";
import { DynamicProduct } from "../../../types/Product";
import cn from "classnames";
import { getProductById } from "../../../helper/fetch";

export type Props = {
  selectedAdminProduct: DynamicProduct | null;
  adminProductList: DynamicProduct[];
  setSelectedAdminProduct: (product: DynamicProduct | null) => void;
  setLoadingAdminProductDetails: (value: boolean) => void;
  setErrorProductDetails: (value: boolean) => void;
  setProductUpdateFormOpen: (value: boolean) => void;
}

export const AdminProductList:React.FC<Props> = ({ 
  selectedAdminProduct, 
  adminProductList,
  setSelectedAdminProduct,
  setLoadingAdminProductDetails,
  setErrorProductDetails,
  setProductUpdateFormOpen,
}) => {
  const handleOpenCloseProduct = (product: DynamicProduct) => {
    if (selectedAdminProduct?.id === product.id) {
      setSelectedAdminProduct(null);
      setProductUpdateFormOpen(false);
      return;
    }
    fetchProductDetails(product.id);
    setProductUpdateFormOpen(true);
  };
  
  const fetchProductDetails = useMemo(
    () => (id: string) => {
      setErrorProductDetails(false);
      setLoadingAdminProductDetails(true);

      getProductById(id)
        .then((data) => {
          if (data) {
            setSelectedAdminProduct(data);
          }
        })
        .catch((error) => {
          setErrorProductDetails(true);
          console.error("Failed to fetch product details:", error);
        })
        .finally(() => setLoadingAdminProductDetails(false))
    }, []
  );

  return (
    <div
      className={cn("admin__left", "tile", {
        "admin__left--open": !selectedAdminProduct,
      })}
    >
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
                    className={cn("admin__button", {
                      "admin__button--open":
                        selectedAdminProduct?.id !== product.id,
                      "admin__button--close":
                        selectedAdminProduct?.id === product.id,
                    })}
                  >
                    {selectedAdminProduct?.id === product.id ? "Close" : "Open"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
  );
};
