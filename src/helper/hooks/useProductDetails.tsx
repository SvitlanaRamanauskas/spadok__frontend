import { useContext, useEffect, useState } from "react";
import { fetchAllProducts, getProductById } from "../fetch/fetch";
import { AppContext } from "../../components/appContext";
import { DynamicProduct } from "../../types/Product";
import { useNavigate } from "react-router-dom";

export const useProductDetails = (productId: number) => {
  const [productsFromServer, setProductsFromServer] = useState<
    DynamicProduct[]
  >([]);
  const [productDetailsLoading, setProductDetailsLoading] = useState(false);
  const [productNotFound, setProductNotFound] = useState(false);
  const [productFetchError, setProductFetchError] = useState(false);
  const navigate = useNavigate();

  const { setSelectedProduct } = useContext(AppContext);

  useEffect(() => {
    if (!productId) {
      return;
    }

    const fetchProduct = async () => {
      try {
        setProductNotFound(false);
        setProductFetchError(false);
        setProductDetailsLoading(true);

        const productData = await getProductById(productId);
         console.log("productData", productData)
        if (!productData) {
          setSelectedProduct(null);
          setProductNotFound(true);
          return;
        } 

        setSelectedProduct(productData);

      } catch (error) {
        setProductNotFound(true);
        throw error;
      } finally {
        setProductDetailsLoading(false);
      }
    };

    const fetchProducts = async () => {
      try {
        const productsData = await fetchAllProducts();
        if (!productsData) {throw new Error("ProductNotFound")};
        setProductsFromServer(productsData);
      } catch (error) {
        setProductNotFound(true);
        throw error;
      } finally {
        setProductDetailsLoading(false);
      }
    };

    fetchProduct();
    fetchProducts();
  }, [productId, setSelectedProduct]);

  console.log("UseProductDetailsHook")

  return {
    productDetailsLoading,
    setProductDetailsLoading,
    setProductNotFound,
    productNotFound,
    productFetchError,
    productsFromServer,
  };
};
