import { useEffect, useState } from "react";
import { Vyshyvanka } from "../types/Vyshyvanka";
import { fetchBestsellers } from "../helper/fetch";
import { List } from "../components/List";
import { Loader } from "../components/Loader";

export const BestsellersPage = () => {
    const [bestsellers, setBestsellers] = useState<Vyshyvanka[]>([]);
    const [bestsellersLoading, setBestsellersLoading] = useState(false);
    
    useEffect(() => {
        setBestsellersLoading(true);
        setTimeout(()=> {
            fetchBestsellers()
            .then(products => setBestsellers(products))
            .catch(error => {
                throw new Error('Error fetching boy`s vyshyvanky:', error);
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
