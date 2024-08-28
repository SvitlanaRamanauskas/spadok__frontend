import { Vyshyvanka } from "../types/Vyshyvanka";
import { VyshyvankaDetails } from "../types/VyshyvankaDetails";

export const fetchVyshyvanky = async() : Promise<Vyshyvanka[]> => {
    try {
        const response = await fetch('./api/vyshyvanky.json', { method: 'GET'});
        if (!response.ok) {
            throw new Error(`${response.status} ${response.statusText}`);
        }
        return await response.json();
    } catch (error: any) {
        throw new Error(`Error fetching products: ${error.message}`);
    }
}

export const getProductDetails = async (
    productId: string,
    productCategory: string,
  ): Promise<VyshyvankaDetails | null> => {
    try {
      const response = await fetch(`./api/${productCategory}.json`, {
        method: 'GET',
      });
  
      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
  
        throw new Error(`${response.status} ${response.statusText}`);
      }
  
      const productDetails = await response.json();
      const product = productDetails.find(
        (prod: VyshyvankaDetails) => prod.id === productId,
      );
  
      return product || null;
    } catch (error: any) {
      throw new Error(`Error fetching product details: ${error.message}`);
    }
  };

export const fetchFemaleVyshyvanky = () => {
    return fetchVyshyvanky()
      .then(products => products.filter(product => product.category === 'women'));
} 

export const fetchMaleVyshyvanky = () => {
    return fetchVyshyvanky()
      .then(products => products.filter(product => product.category === 'men'));
} 

export const fetchBoysVyshyvanky = () => {
    return fetchVyshyvanky()
      .then(products => products.filter(product => product.category === 'boys'));
} 

export const fetchGirlsVyshyvanky = () => {
    return fetchVyshyvanky()
      .then(products => products.filter(product => product.category === 'girls'));
}
