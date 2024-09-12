import { useEffect, useState } from "react";
import { Vyshyvanka } from "../types/Vyshyvanka";
import { fetchGirlsVyshyvanky } from "../helper/fetch";
import { List } from "../components/List";
import { Loader } from "../components/Loader";

export const GirlsPage = () => {
    const [girlVyshyvanky, setGirlVyshyvanky] = useState<Vyshyvanka[]>([]);
    const [girlProductsLoading, setGirlProductsLoading] = useState(false);
    
    useEffect(() => {
        setGirlProductsLoading(true);
        setTimeout(()=> {
            fetchGirlsVyshyvanky()
            .then(femaleProducts => setGirlVyshyvanky(femaleProducts))
            .catch(error => {
                throw new Error('Error fetching male vyshyvanky:', error);
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
