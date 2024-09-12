import { Book } from "../types/Book";
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

export const fetchBooks = async() : Promise<Book[]> => {
  try {
      const response = await fetch('./api/books.json', { method: 'GET'});
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

export const includesQuery = (productsName: string | null, input: string) => {
  return productsName?.trim().toLowerCase().includes(input.trim().toLowerCase());
};

export const getPreparedVyshyvanky = (products: Vyshyvanka[], params: any) => {
  const preparedProducts = [...products];

  if (params.query) {
    return preparedProducts.filter(prod => {
      return includesQuery(prod.name, params.query);
    });
  }

  if (params.sort) {
    return preparedProducts.sort((a, b) => {
      switch (params.sort) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'priceFromLow':
          return a.price - b.price;
        case 'priceFromHigh':
          return b.price - a.price;
          default:
            return 0;
      }
    });
  }

  return preparedProducts;
};
