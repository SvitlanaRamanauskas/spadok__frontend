import { useEffect, useState } from "react";
import { fetchGirlsVyshyvanky } from "../helper/fetch";
import { List } from "../components/List";
import { Loader } from "../components/Loader";
import { Vyshyvanka } from "../types/Vyshyvanka";

export const GirlsPage = () => {
    const [girlVyshyvanky, setGirlVyshyvanky] = useState<Vyshyvanka[]>([]);
    const [girlProductsLoading, setGirlProductsLoading] = useState(false);
    
    useEffect(() => {
        setGirlProductsLoading(true);
        setTimeout(()=> {
            fetchGirlsVyshyvanky()
            .then(products => setGirlVyshyvanky(products))
            .catch(error => {
                throw new Error('Error fetching girls vyshyvanky:', error);
              }
            )
            .finally(() => setGirlProductsLoading(false))
        }, 1000);
    
    }, [])
    
    return  (
        <div>

            {girlProductsLoading && <Loader />}

            <List items={girlVyshyvanky} />
        </div>
    )
}
