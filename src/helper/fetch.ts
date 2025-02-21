import { EntityStateAdapter } from "@reduxjs/toolkit";
import { AdminCategoriesData, AdminCategory, AdminSubcategory } from "../types/AdminNames";
import { Book } from "../types/Book";
import { Order } from "../types/Order";
import { DynamicProduct } from "../types/Product";
import { Vyshyvanka } from "../types/Vyshyvanka";

const baseUrl = process.env.PUBLIC_URL || "";
// json-server --watch db.json --port 3001

//'http://localhost:8081'

export const updateEntity = async <T extends AdminCategory | AdminSubcategory | Vyshyvanka | Book>(
  entityType: string,
  { id, ...data }: { id: string } & Partial<T>
): Promise<T> => {
  try {
    const response = await fetch(`http://localhost:3001/${entityType}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    console.log(`${entityType.slice(0, -1)} successfully updated`);
    return await response.json();
  } catch (error: unknown) {
    throw new Error(
      error instanceof Error
        ? `Error updating ${entityType.slice(0, -1)}: ${error.message}`
        : `Unknown error occurred while updating ${entityType.slice(0, -1)}`
    );
  }
};


export const createProduct = async <T extends DynamicProduct>(product: T): Promise<T> => {
  try {
    const body = JSON.stringify(
      Object.fromEntries(Object.entries(product).filter(([_, value]) => value !== undefined))
    );

    const response = await fetch("http://localhost:3001/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    console.log("Product successfully created");
    return await response.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error creating product: ${error.message}`);
    } else {
      throw new Error("Unknown error occurred while creating product");
    }
  }
};

export const createVyshyvanka = (product: Vyshyvanka) => createProduct(product);
export const createBook = (product: Book) => createProduct(product);

export const createAdminCategory = async ({ name, key, id }: AdminCategory): Promise<AdminCategory> => {
    try {
      const response = await fetch('http://localhost:3001/categories', { 
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, key, id }),
      });
  
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
  
      console.log('Order successfully posted');
      const data = await response.json();
      return data;
    
    } catch (error: any) {
      throw new Error(`Error posting order: ${error.message}`);
    }
}

export const createAdminSubcategory = async ({ name, key, id, category, image }: AdminSubcategory): Promise<AdminSubcategory> => {
  try {
    const response = await fetch('http://localhost:3001/subcategories', { 
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, key, id, category }),
    });

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    console.log('Order successfully posted');
    const data = await response.json();
    return data;
  
  } catch (error: any) {
    throw new Error(`Error posting order: ${error.message}`);
  }
}

export const deleteProduct = async (productId: string) => {
  try {
    const response = await fetch(`http://localhost:3001/products/${productId}`, {method: "DELETE"});
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`)
    }

    return response.json();
  } catch (error: any) {
    throw new Error(`Error posting order: ${error.message}`);
  }
}

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

export const fetchAllProducts = async() : Promise<DynamicProduct[]> => {
  try {
    const response = await fetch(`${baseUrl}/api/db.json`, {method: "GET"} );
    if (!response.ok) {
      console.error(`Failed to fetch: ${response.status} ${response.statusText}`);
        throw new Error(`${response.status} ${response.statusText}`);
    }

    const data = await response.json()
    return data.products;

  } catch (error: any) {
      throw new Error(`Error fetching all products: ${error.message}`);
  }
}

export const fetchProductsBySubcategory = (subcategoryKey: string): Promise<DynamicProduct[]> => {
  return fetchAllProducts()
    .then(products => products.filter(product => product.subcategory === subcategoryKey));
}

export const fetchCategoriesList = async () => {
  try {
    const response = await fetch(`${baseUrl}/api/db.json`, {method: "GET"} );
    const data = await response.json();
    const categories = data;

    return categories.categories;
  } catch(error) {
    console.error("Error fetching Categories NameList:", error);
    return [];
  }
}

export const fetchSubcategoriesList = async () => {
  try {
    const response = await fetch(`${baseUrl}/api/db.json`, {method: "GET"} );
    const data = await response.json();
    const subcategories = data;

    return subcategories.subcategories;
  } catch(error) {
    console.error("Error fetching Subcategories NameList:", error);
    return [];
  }
}

export const fetchSubcategoriesKeyList = async () => {
  try {
    const response = await fetch(`${baseUrl}/api/categoryNames.json`, {method: "GET"} );
    const data = await response.json();
    const subcategoryKeys = data.map(
      ((subcategory: AdminSubcategory) => subcategory.key)
    );
    
    return subcategoryKeys;
  } catch(error) {
    console.error("Error fetching Subcategories Key List:", error);
    return [];
  }
}


export const fetchSubcategoriesByCategory = async (category: AdminCategory) => {
  try {
    const response = await fetch(`http://localhost:3001/subcategories`, {method: "GET"} );
    const data = await response.json();
    const subcategories = data
      .filter((subcategory: AdminSubcategory) => subcategory.category === category.id) || []
    
    return subcategories;
  } catch(error) {
    console.error("Error fetching Subcategories NameList By Category:", error);
    return [];
  }
}

export const getProductById = async (productId: string): Promise<DynamicProduct | undefined> => {
  const products = await fetchAllProducts();
  return products.find((product: DynamicProduct) => productId === product.id);
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

export const getPreparedVyshyvanky = (products: DynamicProduct[], params: any) => {
  const preparedProducts = [...products];

  if (params.query) {
    return preparedProducts.filter(prod => {
      return includesQuery(prod.title, params.query);
    });
  }

  if (params.sort) {
    return preparedProducts.sort((a, b) => {
      if (params.sort === 'алфавітом') {
        return a.title.localeCompare(b.title);
      } else if (params.sort === 'дешевші') {
        return a.price - b.price;
      } else if (params.sort === 'дорожчі') {
        return b.price - a.price;
      } else {
        return 0;
      }
    });
  }

  return preparedProducts;
};
