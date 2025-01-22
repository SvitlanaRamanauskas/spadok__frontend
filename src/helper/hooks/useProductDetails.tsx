import { useContext, useEffect, useState } from "react";
import { VyshyvankaDetails } from "../../types/VyshyvankaDetails";
import { getProductDetails, getProductDetailsList } from "../fetch";
import { AppContext } from "../../components/appContext";

export const useProductDetails = (
    productId: string,
    category: string
) => {
    const [productDetailsList, setProductDetailsList] = useState<
        VyshyvankaDetails[] | []
      >([]);
    const [productDetailsLoading, setProductDetailsLoading] = useState(false);
    const [productNotFound, setProductNotFound] = useState(false);
    const [productFetchError, setProductFetchError] = useState(false);

    const { setSelectedProduct } = useContext(AppContext);

    useEffect(() => {
        if (!productId) {
        return;
        }

        const fetchProductDetails = async () => {
        try {
            setProductNotFound(false);
            setProductFetchError(false);
            setProductDetailsLoading(true);
            const productData = await getProductDetails(productId, category);
            if(!productData) throw new Error("ProductNotFound");
            setSelectedProduct(productData);
        } catch(error) {
            setProductNotFound(true);
            throw error;
        } finally {
            setProductDetailsLoading(false); //navigate?? 
        } 
        

        // setCurrentImage(
        //   productData.images.length > 0 ? `${process.env.PUBLIC_URL}/${productData.images[0]}` : ""
        // );
        }

        const fetchProductList = async () => {
        try {
            const data = await getProductDetailsList(category);
            setProductDetailsList(data ?? []);
        } catch (error) {
            console.error("Error fetching product list:", error);
            }
        }

        fetchProductDetails();
        fetchProductList();
    }, [productId, category]);

    return { productDetailsLoading, setProductDetailsLoading, productNotFound, productFetchError, productDetailsList };
  }
