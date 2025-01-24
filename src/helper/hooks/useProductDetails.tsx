import { useContext, useEffect, useState } from "react";

import { fetchVyshyvanky, getProductById } from "../fetch";
import { AppContext } from "../../components/appContext";
import { Vyshyvanka } from "../../types/Vyshyvanka";

export const useProductDetails = (
    productId: string,
) => {
    const [vyshyvankyFromServer, setVyshyvankyFromServer] = useState<Vyshyvanka[]>([])
    const [productDetailsLoading, setProductDetailsLoading] = useState(false);
    const [productNotFound, setProductNotFound] = useState(false);
    const [productFetchError, setProductFetchError] = useState(false);

    const { setSelectedProduct } = useContext(AppContext);

    useEffect(() => {
        if (!productId) {
        return;
        }

        const fetchVyshyvanka = async () => {
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
        
        // setCurrentImage(
        //   productData.images.length > 0 ? `${process.env.PUBLIC_URL}/${productData.images[0]}` : ""
        // );
        }

        const fetchAllVyshyvanky = async () => {
            try {
                const productData = await fetchVyshyvanky();
                if(!productData) throw new Error("ProductNotFound");
                setVyshyvankyFromServer(productData);
            } catch(error) {
                setProductNotFound(true);
                throw error;
            } finally {
                setProductDetailsLoading(false); //navigate?? 
            } 
        }

        fetchVyshyvanka();
        fetchAllVyshyvanky();
    }, [productId]);

    return { productDetailsLoading, setProductDetailsLoading, productNotFound, productFetchError, vyshyvankyFromServer };
  }
