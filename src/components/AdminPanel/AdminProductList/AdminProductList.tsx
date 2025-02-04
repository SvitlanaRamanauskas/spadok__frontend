import { useMemo } from "react";
import { Product } from "../../../types/Product";
import cn from "classnames";
import { getProductById } from "../../../helper/fetch";

export type Props = {
  selectedAdminProduct: Product | null;
  adminProductList: Product[];
  setSelectedAdminProduct: (product: Product | null) => void;
  setLoadingAdminProductDetails: (value: boolean) => void;
  setErrorProductDetails: (value: boolean) => void;
}

export const AdminProductList:React.FC<Props> = ({ 
  selectedAdminProduct, 
  adminProductList,
  setSelectedAdminProduct,
  setLoadingAdminProductDetails,
  setErrorProductDetails,
}) => {
  const handleOpenCloseProduct = (product: Product) => {
    if (selectedAdminProduct?.id === product.id) {
      setSelectedAdminProduct(null);
      return;
    }
    fetchProductDetails(product.id);
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
  console.log(selectedAdminProduct);

  return (
    <div
      className={cn("admin__side", "tile", {
        "admin__side-open": !selectedAdminProduct,
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
