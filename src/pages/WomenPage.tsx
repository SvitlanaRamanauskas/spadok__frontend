import { useEffect, useState } from "react";
import { Vyshyvanka } from "../types/Vyshyvanka";
import { fetchFemaleVyshyvanky } from "../helper/fetch";
import { VyshyvankaList } from "../components/ProductList";
import { Loader } from "../components/Loader";

export const WomenPage = () => {
  const [femaleVyshyvanky, setFemaleVyshyvanky] = useState<Vyshyvanka[]>([]);
  const [femaleProductsLoading, setFemaleProductsLoading] = useState(false);

  useEffect(() => {
    setFemaleProductsLoading(true);

    setTimeout(() => {
        fetchFemaleVyshyvanky()
        .then((femaleProducts) => 
            setFemaleVyshyvanky(femaleProducts)
        )
        .catch((error) => {
          throw new Error("Error fetching female vyshyvanky:", error);
        })
        .finally(() => setFemaleProductsLoading(false));
    }, 1000);
  }, []);

  return (
    <div>
      <h2 className="category__sub-title sub-title">Для неї</h2>

      {femaleProductsLoading && <Loader />}

      <VyshyvankaList items={femaleVyshyvanky} />
    </div>
  );
};
