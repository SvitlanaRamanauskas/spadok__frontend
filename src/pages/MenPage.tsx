import { useEffect, useState } from "react";
import { List } from "../components/List";
import { fetchMaleVyshyvanky } from "../helper/fetch";
import { Loader } from "../components/Loader";
import { Vyshyvanka } from "../types/Vyshyvanka";

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
            
            {maleProductsLoading && <Loader />}

            <List items={maleVyshyvanky} />
        </div>
    )
}
