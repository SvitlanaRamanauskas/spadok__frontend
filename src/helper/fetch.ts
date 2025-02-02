import { AdminCategoriesData, AdminCategory, AdminSubcategory } from "../types/AdminNames";
import { Book } from "../types/Book";
import { Order } from "../types/Order";
import { Product } from "../types/Product";
import { Vyshyvanka } from "../types/Vyshyvanka";

const baseUrl = process.env.PUBLIC_URL || "";

//'http://localhost:8081'
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

export const fetchAllProducts = async() : Promise<Product[]> => {
  try {
    const response = await fetch(`${baseUrl}/api/allCategories.json`, {method: "GET"} );
    if (!response.ok) {
      console.error(`Failed to fetch: ${response.status} ${response.statusText}`);
        throw new Error(`${response.status} ${response.statusText}`);
    }
    return await response.json();

  } catch (error: any) {
      throw new Error(`Error fetching all products: ${error.message}`);
  }
}

export const fetchProductsBySubcategory = (subcategoryKey: string): Promise<Product[]> => {
  return fetchAllProducts()
    .then(products => products.filter(product => product.subcategory === subcategoryKey));
}

export const fetchCategoriesNameList = async () => {
  try {
    const response = await fetch(`${baseUrl}/api/categoryNames.json`, {method: "GET"} );
    const data = await response.json();
    const categories = data.categories.map((category: AdminCategory) => category.name) || [];
    return categories;
  } catch(error) {
    console.error("Error fetching Categories NameList:", error);
    return [];
  }
}

export const fetchSubcategoriesNameList = async () => {
  try {
    const response = await fetch(`${baseUrl}/api/categoryNames.json`, {method: "GET"} );
    const data = await response.json();
    const subcategories = data.categories.map(
      (category: AdminCategory) => category.subcategories.map(
        ((subcategory: AdminSubcategory) => subcategory.name)
      )
    );

    return subcategories;
  } catch(error) {
    console.error("Error fetching Subcategories NameList:", error);
    return [];
  }
}

export const fetchSubcategoriesKeyList = async () => {
  try {
    const response = await fetch(`${baseUrl}/api/categoryNames.json`, {method: "GET"} );
    const data = await response.json();
    const subcategoryKeys = data.categories.map(
      (category: AdminCategory) => category.subcategories.map(
        ((subcategory: AdminSubcategory) => subcategory.key)
      )
    );
    
    return subcategoryKeys;
  } catch(error) {
    console.error("Error fetching Subcategories Key List:", error);
    return [];
  }
}


export const fetchSubcategoriesNameListByCategory = async (category: string) => {
  try {
    const response = await fetch(`${baseUrl}/api/categoryNames.json`, {method: "GET"} );
    const data = await response.json();
    const categoryObj = data.categories.find(
      (dataCategory: AdminCategory) => category === dataCategory.name);
    const subcategories = categoryObj.subcategories.map((subcategory: AdminSubcategory) => subcategory.name)
    
    return subcategories;
  } catch(error) {
    console.error("Error fetching Subcategories NameList By Category:", error);
    return [];
  }
}

export const getProductById = async (productId: string): Promise<Product | undefined> => {
  const products = await fetchAllProducts();
  return products.find((product: Product) => productId === product.id);
}

export const fetchVyshyvanky = (): Promise<Vyshyvanka[]> => {
  return fetchAllProducts()
    .then(products => products.filter((product): product is Vyshyvanka => product.category === 'vyshyvanky'));
} 

export const fetchFemaleVyshyvanky = (): Promise<Vyshyvanka[]> => {
    return fetchVyshyvanky()
      .then(products => products.filter((product): product is Vyshyvanka => product.subcategory === 'women'));
} 

export const fetchMaleVyshyvanky = (): Promise<Vyshyvanka[]> => {
    return fetchVyshyvanky()
      .then(products => products.filter((product): product is Vyshyvanka => product.subcategory === 'men'));
} 

export const fetchBoysVyshyvanky = () => {
    return fetchVyshyvanky()
      .then(products => products.filter((product): product is Vyshyvanka => product.subcategory === 'boys'));
} 

export const fetchGirlsVyshyvanky = () => {
    return fetchVyshyvanky()
      .then(products => products.filter((product): product is Vyshyvanka => product.subcategory === 'girls'));
}




export const fetchBooks = ()  => {
  return fetchAllProducts()
    .then(products => products.filter((product) : product is Book => product.category === 'books'));
}

export const fetchBestsellers = () => {
  return fetchAllProducts()
    .then(products => products.filter((product): product is Vyshyvanka => product.title === "Сорочка \"Дубки\""));
} 




export const includesQuery = (productsName: string | null, input: string) => {
  return productsName?.trim().toLowerCase().includes(input.trim().toLowerCase());
};

export const getPreparedVyshyvanky = (products: Product[], params: any) => {
  const preparedProducts = [...products];

  if (params.query) {
    return preparedProducts.filter(prod => {
      return includesQuery(prod.title, params.query);
    });
  }

  if (params.sort) {
    return preparedProducts.sort((a, b) => {
      if (params.sort === 'title') {
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
