import { useState } from "react";
import { Product } from "../../../types/Product";
import cn from "classnames";
import { deleteProduct } from "../../../helper/fetch";

export type Props = {
  selectedAdminProduct: Product;
  setAdminProductList:React.Dispatch<React.SetStateAction<Product[]>>;
}


export const AdminProductDetails:React.FC<Props> = ({ 
  selectedAdminProduct,
  setAdminProductList
 }) => {
  const [productTitle, setProductTitle] = useState<string>(selectedAdminProduct.title) 
  const [errorProductTitle, setErrorProductTitle] = useState(false);

  // const changeProduct = () => {
  //   setNewProduct((prevProduct) => {
  //     return {

  //     }
  //   })
  // }


  const handleInputProductTitleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setProductTitle(event.target.value);
    setErrorProductTitle(false);
  };

  const deleteCurrentProduct = async (productId: string) => {
    try {
      await deleteProduct(productId);
  
      setAdminProductList((currentProducts) =>
        (currentProducts as Product[]).filter((prod) => prod.id !== productId)
      );
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  }


  const reset = () => {
    setProductTitle("");
    setErrorProductTitle(false);
  };

  const submit = (event: React.FormEvent) => {

  };
  
  return (
    <div
      className={cn("tile", "sidebar", {
        "sidebar--open": selectedAdminProduct,
      })}
    >
      <h5 className="sidebar__title">Змінити продукт {selectedAdminProduct?.title}</h5>

      <form 
        action=""
        className="sidebar__form"
        onReset={reset}
        onSubmit={submit}
      >

        <label htmlFor="" className="sidebar__label">{selectedAdminProduct.title}</label>
        <input 
          type="text" 
          value={productTitle}
          onChange={handleInputProductTitleChange}
          className="sidebar__input"

         />

         <button type="submit" className="sidebar__submit">
            Змінити
         </button>
         
         <button type="reset" className="sidebar__submit">
            Очистити
         </button>


         <button 
          type="reset" 
          className="sidebar__submit"
          onClick={() => deleteCurrentProduct(selectedAdminProduct.id)}
         >
            Видалити товар
         </button>
      </form>
    </div>
  );
};
