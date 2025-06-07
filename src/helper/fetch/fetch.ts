import { AdminCategory, AdminSubcategory } from "../../types/AdminNames";
import { Book } from "../../types/Book";
import { Order } from "../../types/Order";
import { DynamicProduct } from "../../types/Product";
import { Vyshyvanka } from "../../types/Vyshyvanka";
import { fetchCategoriesList } from "./adminFetch";
//admin@test.com
//Random147@

// json-server --watch db.json --port 3001 в терміналі  для тестування серверу
// `${baseUrl}/api/db.json` ендпоінт для демо

//'http://localhost:8081'

const baseUrl = process.env.PUBLIC_URL || "";

export const createOrder = async ({
  buyerName,
  phoneNumber,
  orderedProducts,
}: Omit<Order, "orderId">) => {
  try {
    const response = await fetch("./api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ buyerName, phoneNumber, orderedProducts }),
    });

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    console.log("Order successfully posted");
    const data = await response.json();
    return data.orderId;
  } catch (error: any) {
    throw new Error(`Error posting order: ${error.message}`);
  }
};

export const fetchAllProducts = async (): Promise<DynamicProduct[]> => {
  try {
    const response = await fetch(`${baseUrl}/api/db.json`, {
      method: "GET",
    });
    //`${baseUrl}/api/db.json` for demo
    //`http://localhost:8080/api/v1/products` for server

    if (!response.ok) {
      console.error(
        `Failed to fetch: ${response.status} ${response.statusText}`
      );
      throw new Error(`${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.products; //to add .products for demo / don't add .products for server
  } catch (error: any) {
    throw new Error(`Error fetching all products: ${error.message}`);
  }
};

export const getProductById = async (
  productId: number
): Promise<DynamicProduct | undefined> => {
  const products = await fetchAllProducts();
  return products.find((product: DynamicProduct) => productId === product.id);
};

export const fetchVyshyvanky = async (): Promise<Vyshyvanka[]> => {
  try {
    const categories: AdminCategory[] = await fetchCategoriesList();
    const allProducts = await fetchAllProducts();
    const categoryForVyshyvanky = categories.find(
      (cat) => cat.key === "vyshyvanky"
    );

    if (categoryForVyshyvanky) {
      const vyshyvanky = allProducts.filter(
        (prod) => prod.subcategoryId === categoryForVyshyvanky.id
      );
      return vyshyvanky as Vyshyvanka[];
    }

    return [];
  } catch (error) {
    console.error(
      "Error fetching Subcategories NameList of a Category:",
      error
    );
    return [];
  }
};

export const fetchBooks = () => {
  return fetchAllProducts().then((products) =>
    products.filter((product): product is Book => product.category === "books")
  );
};

export const fetchBestsellers = () => {
  return fetchAllProducts().then((products) =>
    products.filter(
      (product): product is Vyshyvanka => (product.title === 'Сорочка "Дубки"' && product.size === "92" ) || product.title === 'Біжу аби бігти'
    )
  );
};

// export const fetchSubcategoriesByCategory = async (category: AdminCategory) => {
//   try {
//     const subcategories = await fetchSubcategoriesList();
//     const subcategoriesOfCategory =
//       subcategories.filter(
//         (subcategory: AdminSubcategory) =>
//           subcategory.categoryId === category.id
//       ) || [];

//     return subcategoriesOfCategory;
//   } catch (error) {
//     console.error(
//       "Error fetching Subcategories NameList of a Category:",
//       error
//     );
//     return [];
//   }
// };
