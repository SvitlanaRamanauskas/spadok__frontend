import { useEffect, useState } from "react";
import { Vyshyvanka } from "../types/Vyshyvanka";
import { fetchFemaleVyshyvanky } from "../helper/fetch";
import { List } from "../components/List";
import { Loader } from "../components/Loader";

export const WomenPage = () => {
  const [femaleVyshyvanky, setFemaleVyshyvanky] = useState<Vyshyvanka[]>([]);
  const [femaleProductsLoading, setFemaleProductsLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

      {femaleProductsLoading && <Loader />}

      <List items={femaleVyshyvanky} />
    </div>
  );
};
