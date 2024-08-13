import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { Vyshyvanka } from "../types/Vyshyvanka";
import { fetchFemaleVyshyvanky } from "../helper/fetch";
import { VyshyvankaList } from "../components/VyshyvankaList";

export const WomenPage = () => {

const [femaleVyshyvankyy, setFemaleVyshyvanky] = useState<Vyshyvanka[]>([]);
const [femaleProductsLoading, setFemaleProductsLoading] = useState(false);

useEffect(() => {
    setFemaleProductsLoading(true);

    fetchFemaleVyshyvanky()
    .then(femaleProducts => setFemaleVyshyvanky(femaleProducts))
    .catch(error => {
        throw new Error('Error fetching female vyshyvanky:', error);
      }
    )
    .finally(() => setFemaleProductsLoading(false))
}, [])

    return  (
        <div>
            <h2 className="category__sub-title sub-title">Для неї</h2>

            <VyshyvankaList items={femaleVyshyvankyy} />
        </div>
    )
}
