import { useContext } from "react";
import { ProductDetails } from "../components/ProductDetails";
import { AppContext } from "../components/appContext";



export const ProductDetailsPage = () => {

  const { selectedProduct } = useContext(AppContext);

  return <ProductDetails />;
};
