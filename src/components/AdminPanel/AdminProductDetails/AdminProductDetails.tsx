import { Product } from "../../../types/Product";
import cn from "classnames";

export type Props = {
  selectedAdminProduct: Product;
}


export const AdminProductDetails:React.FC<Props> = ({ selectedAdminProduct }) => {
  return (
    <div
      className={cn("sidebar", {
        "sidebar--open": selectedAdminProduct,
      })}
    >
      <h5 className="admin__right-title">{selectedAdminProduct?.title}</h5>
    </div>
  );
};
