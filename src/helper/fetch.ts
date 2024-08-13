import { Vyshyvanka } from "../types/Vyshyvanka";

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
