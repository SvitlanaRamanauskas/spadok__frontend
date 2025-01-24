import { useEffect, useState } from "react";
import { fetchBoysVyshyvanky } from "../helper/fetch";
import { List } from "../components/List";
import { Loader } from "../components/Loader";
import { Vyshyvanka } from "../types/Vyshyvanka";

export const BoysPage = () => {
    const [boyVyshyvanky, setBoyVyshyvanky] = useState<Vyshyvanka[]>([]);
    const [boyProductsLoading, setBoyProductsLoading] = useState(false);
    
    useEffect(() => {
        setBoyProductsLoading(true);
        setTimeout(()=> {
            fetchBoysVyshyvanky()
            .then(products => setBoyVyshyvanky(products))
            .catch(error => {
                throw new Error('Error fetching boy`s vyshyvanky:', error);
              }
            )
            .finally(() => setBoyProductsLoading(false))
        }, 1000);
    
    }, [])
    
    return  (
        <div>

            {boyProductsLoading && <Loader />}

            <List items={boyVyshyvanky} />
        </div>
    )
}
