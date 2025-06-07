import { useEffect, useState } from "react";
import { fetchBestsellers } from "../helper/fetch/fetch";
import { List } from "../components/List";
import { Loader } from "../components/Loader";
import { DynamicProduct } from "../types/Product";

export const BestsellersPage = () => {
    const [bestsellers, setBestsellers] = useState<DynamicProduct[]>([]);
    const [bestsellersLoading, setBestsellersLoading] = useState(false);
    
    useEffect(() => {
        setBestsellersLoading(true);
        setTimeout(()=> {
            fetchBestsellers()
            .then((products) => setBestsellers(products))
            .catch(error => {
                throw new Error('Error fetching bestsellers', error);
              }
            )
            .finally(() => setBestsellersLoading(false))
        }, 1000);
    
    }, [])
    
    return  (
        <div>
            {bestsellersLoading && <Loader />}

            <List items={bestsellers} />
        </div>
    )
}
