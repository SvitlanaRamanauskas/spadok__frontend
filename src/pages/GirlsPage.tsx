import { useEffect, useState } from "react";
import { Vyshyvanka } from "../types/Vyshyvanka";
import { fetchGirlsVyshyvanky } from "../helper/fetch";
import { VyshyvankaList } from "../components/VyshyvankaList";
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
            <h2 className="category__sub-title sub-title">Для дівчинки</h2>

            {girlProductsLoading && <Loader />}

            <VyshyvankaList items={girlVyshyvanky} />
        </div>
    )
}
