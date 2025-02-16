import { useEffect, useState } from "react";
import { fetchProductsBySubcategory } from "../helper/fetch";
import { List } from "../components/List";
import { Loader } from "../components/Loader";
import { ItemsNotFound } from "../components/ItemsNotFound";

import { DynamicProduct } from "../types/Product";
import { useParams } from "react-router-dom";

export const SubcategoryPage = () => {
  const { subcategoryKey } = useParams<{ subcategoryKey: string }>()
  const [products, setProducts] = useState<DynamicProduct[]>([]);
  const [productsLoading, setProductsLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!subcategoryKey) return; 

    setProductsLoading(true);
    setTimeout(() => {
        fetchProductsBySubcategory(subcategoryKey)
        .then((products) => 
            setProducts(products)
        )
        .catch((error) => {
          throw new Error("Error fetching female vyshyvanky:", error);
        })
        .finally(() => setProductsLoading(false));
    }, 1000);
  }, [subcategoryKey]);

  
  const filteredProducts = products.filter(item => {
    if ("size" in item) {
      return item.size === item.sizesAvailable[0]
    } return item;
  });


  return (
    <div>
      {productsLoading ? (
        <Loader />
      ) : filteredProducts.length === 0 && !productsLoading ? (
        <ItemsNotFound />
      ) : (<List items={filteredProducts} />)
      }  

    </div>
  );
};
