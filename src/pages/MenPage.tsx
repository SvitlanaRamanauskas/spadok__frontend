import { useEffect, useState } from "react";
import { VyshyvankaList } from "../components/VyshyvankaList";
import { Vyshyvanka } from "../types/Vyshyvanka";
import { fetchMaleVyshyvanky } from "../helper/fetch";
import { Loader } from "../components/Loader";

export const MenPage = () => {
    const [maleVyshyvanky, setMaleVyshyvanky] = useState<Vyshyvanka[]>([]);
    const [maleProductsLoading, setMaleProductsLoading] = useState(false);
    
    useEffect(() => {
        setMaleProductsLoading(true);

        setTimeout(() => {
            fetchMaleVyshyvanky()
            .then(femaleProducts => setMaleVyshyvanky(femaleProducts))
            .catch(error => {
                throw new Error('Error fetching male vyshyvanky:', error);
              }
            )
            .finally(() => setMaleProductsLoading(false))
        }, 1000)
    }, [])
    
    return  (
        <div>
            <h2 className="category__sub-title sub-title">Для нього</h2>

            {maleProductsLoading && <Loader />}

            <VyshyvankaList items={maleVyshyvanky} />
        </div>
    )
}
