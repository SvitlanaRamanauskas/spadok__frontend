import { useEffect, useState } from "react";
import { Vyshyvanka } from "../types/Vyshyvanka";
import { fetchBoysVyshyvanky } from "../helper/fetch";
import { VyshyvankaList } from "../components/ProductList";
import { Loader } from "../components/Loader";

export const BoysPage = () => {
    const [boyVyshyvanky, setBoyVyshyvanky] = useState<Vyshyvanka[]>([]);
    const [boyProductsLoading, setBoyProductsLoading] = useState(false);
    
    useEffect(() => {
        setBoyProductsLoading(true);
        setTimeout(()=> {
            fetchBoysVyshyvanky()
            .then(femaleProducts => setBoyVyshyvanky(femaleProducts))
            .catch(error => {
                throw new Error('Error fetching boy`s vyshyvanky:', error);
              }
            )
            .finally(() => setBoyProductsLoading(false))
        }, 1000);
    
    }, [])
    
    return  (
        <div>
            <h2 className="category__sub-title sub-title">Для хлопця</h2>

            {boyProductsLoading && <Loader />}

            <VyshyvankaList items={boyVyshyvanky} />
        </div>
    )
}
