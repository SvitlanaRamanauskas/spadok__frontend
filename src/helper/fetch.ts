import { Book } from "../types/Book";
import { BookDetails } from "../types/BookDetails";
import { Order } from "../types/Order";
import { Vyshyvanka } from "../types/Vyshyvanka";
import { VyshyvankaDetails } from "../types/VyshyvankaDetails";

export const createOrder = async({ buyerName, phoneNumber, orderedProducts }: Omit<Order, "orderId">) => {
  try {
    const response = await fetch('./api/orders', { 
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ buyerName, phoneNumber, orderedProducts }),
    });

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    console.log('Order successfully posted');
    const data = await response.json();
    return data.orderId;
  
  } catch (error: any) {
    throw new Error(`Error posting order: ${error.message}`);
  }
}

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
  ): Promise<VyshyvankaDetails | BookDetails | null> => {
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
        (prod: VyshyvankaDetails | BookDetails) => prod.id === productId,
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

export const getPreparedVyshyvanky = (products: Vyshyvanka[] | Book[], params: any) => {
  const preparedProducts = [...products];

  if (params.query) {
    return preparedProducts.filter(prod => {
      const nameOrTitle = 'title' in prod ? prod.title : prod.name;
      return includesQuery(nameOrTitle, params.query);
    });
  }

  if (params.sort) {
    return preparedProducts.sort((a, b) => {
      if (params.sort === 'name' && 'name' in a && 'name' in b) {
        return a.name.localeCompare(b.name);
      } else if (params.sort === 'title' && 'title' in a && 'title' in b) {
        return a.title.localeCompare(b.title);
      } else if (params.sort === 'priceFromLow') {
        return a.price - b.price;
      } else if (params.sort === 'priceFromHigh') {
        return b.price - a.price;
      } else {
        return 0;
      }
    });
  }

  return preparedProducts;
};
