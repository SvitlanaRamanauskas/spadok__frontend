import { useContext, useEffect, useState } from "react";
import { fetchAllProducts, getProductById } from "../fetch";
import { AppContext } from "../../components/appContext";
import { DynamicProduct } from "../../types/Product";

export const useProductDetails = (
    productId: string,
) => {
    const [productsFromServer, setProductsFromServer] = useState<DynamicProduct[]>([])
    const [productDetailsLoading, setProductDetailsLoading] = useState(false);
    const [productNotFound, setProductNotFound] = useState(false);
    const [productFetchError, setProductFetchError] = useState(false);

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
                if(!productData) throw new Error("ProductNotFound");
                setSelectedProduct(productData);
            } catch(error) {
                setProductNotFound(true);
                throw error;
            } finally {
                setProductDetailsLoading(false); //navigate?? 
            } 
        
        }

        const fetchProducts = async () => {
            try {
                const productData = await fetchAllProducts();
                if(!productData) throw new Error("ProductNotFound");
                setProductsFromServer(productData);
            } catch(error) {
                setProductNotFound(true);
                throw error;
            } finally {
                setProductDetailsLoading(false); //navigate?? 
            } 
        }

        fetchProduct();
        fetchProducts();
    }, [productId]);

    return { productDetailsLoading, setProductDetailsLoading, productNotFound, productFetchError, productsFromServer };
  }
