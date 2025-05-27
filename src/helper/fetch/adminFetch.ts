import {
  AdminCategory,
  AdminSubcategory,
} from "../../types/AdminNames";
import { Book } from "../../types/Book";
import { DynamicProduct } from "../../types/Product";
import { Vyshyvanka } from "../../types/Vyshyvanka";
//admin@test.com
//Random147@

// json-server --watch db.json --port 3001 в терміналі  для тестування серверу
// `${baseUrl}/api/db.json` ендпоінт для демо

//'http://localhost:8081'

const baseUrl = process.env.PUBLIC_URL || "";
const token = localStorage.getItem("authToken");

export const updateEntity = async <
  T extends AdminCategory | AdminSubcategory | Vyshyvanka | Book,
>(
  entityType: string,
  entity: { id: number } & Partial<T>
): Promise<T> => {
  const { id, ...data } = entity;
  try {
    if (!id) {
      throw new Error("Missing ID for update request");
    }
    if (!token) {
      throw new Error("Missing authentication token");
    }
    console.log("Auth Token:", token);
    if (token) {
      const [, payload] = token.split(".");
      const decoded = JSON.parse(atob(payload));
      console.log("Token Expiration:", new Date(decoded.exp * 1000));
    }
    const response = await fetch(
      `http://localhost:8080/api/v1/${entityType}/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id, ...data }),
      }
    );

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

export const deleteEntity = async (entityType: string, productId: number) => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/v1/${entityType}/${productId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    return response.status === 204 ? null : response.json();
  } catch (error: any) {
    throw new Error(`Error posting order: ${error.message}`);
  }
};

export const createVyshyvanky = async (
  category: number,
  subcategory: number,
  title: string,
  price: number,
  description: string,
  isAvailable: number,
  size: string,
  sizesAvailable: string[],
  images: File[]
): Promise<DynamicProduct> => {
  try {

    const formData = new FormData();
    formData.append("category", category.toString());
    formData.append("subcategory", subcategory.toString());
    formData.append("title", title);
    formData.append("price", price.toString());
    formData.append("description", description);
    formData.append("isAvailable", isAvailable.toString());
    formData.append("size", size);

    sizesAvailable.forEach(sizeAvailable => {
      formData.append("sizeAvailable", sizeAvailable);
    })
    images.forEach(image => {
      formData.append("image", image);
    })
    const response = await fetch("http://localhost:8080/api/v1/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error creating product: ${error.message}`);
    } else {
      throw new Error("Unknown error occurred while creating product");
    }
  }
};

export const createBooks = async (
  category: number,
  subcategory: number,
  title: string,
  price: number,
  genre: string,
  description: string,
  isAvailable: number,
  images: File[]
): Promise<DynamicProduct> => {
  try {
    const formData = new FormData();
    formData.append("category", category.toString());
    formData.append("subcategory", subcategory.toString());
    formData.append("title", title);
    formData.append("price", price.toString());
    formData.append("genre", genre);
    formData.append("description", description);
    formData.append("isAvailable", isAvailable.toString());

    images.forEach(image => {
      formData.append("image", image);
    })
    const response = await fetch("http://localhost:8080/api/v1/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error creating product: ${error.message}`);
    } else {
      throw new Error("Unknown error occurred while creating product");
    }
  }
};

export const createAdminCategory = async ({
  name,
  key,
}: Omit<AdminCategory, "id">): Promise<AdminCategory> => {
  try {
    console.log("Auth Token:", token);
    if (token) {
      const [, payload] = token.split(".");
      const decoded = JSON.parse(atob(payload));
      console.log("Token Expiration:", new Date(decoded.exp * 1000));
    }
    const response = await fetch("http://localhost:8080/api/v1/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, key }),
    });

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    console.log("Category successfully posted");
    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(`Error posting order: ${error.message}`);
  }
};

export const createAdminSubcategory = async ( 
  name: string,
  key: string,
  categoryId: number,
  image: File): Promise<AdminSubcategory> => {
  try {
    console.log("Auth Token:", token);
    if (token) {
      const [, payload] = token.split(".");
      const decoded = JSON.parse(atob(payload));
      console.log("Token Expiration:", new Date(decoded.exp * 1000));
    }

    const formData = new FormData();
    formData.append("data", JSON.stringify({
      name,
      key,
      categoryId
    }));
    formData.append("file", image);

    const response = await fetch("http://localhost:8080/api/v1/subcategories", {
      method: "POST",
      headers: {
        // 'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    console.log("Subcategory successfully posted");
    const dataFromServer = await response.json();
    return dataFromServer;
  } catch (error: any) {
    throw new Error(`Error posting subcategory: ${error.message}`);
  }
};

export const fetchSubcategoriesList = async (): Promise<AdminSubcategory[]> => {
  try {
    const response = await fetch(`${baseUrl}/api/db.json`, {
      method: "GET",
    }); 
    //`${baseUrl}/api/db.json` for demo
    //`http://localhost:8080/api/v1/subcategories` for server
    const data = await response.json();
    const subcategories = data;

    return subcategories.subcategories; // to add .subcategories for demo / don't add .subcategories for server
  } catch (error) {
    console.error("Error fetching Subcategories NameList:", error);
    return [];
  }
};

export const fetchCategoriesList = async () => {
  try {
    const response = await fetch(`${baseUrl}/api/db.json`, {
      method: "GET",
    }); 
    //`${baseUrl}/api/db.json` for demo
    //`http://localhost:8080/api/v1/categories` for server
    const data = await response.json();
    const categories = data;

    return categories.categories; //to add .categories for demo / don't add categories for server
  } catch (error) {
    console.error("Error fetching Categories NameList:", error);
    return [];
  }
};

export const getCategoryById = async (
  id: number
): Promise<AdminCategory | undefined> => {
  const categoryList: AdminCategory[] = await fetchCategoriesList();
  const category = categoryList.find((item) => item.id === id);
  if (category) return category;
};

export const getSubcategoryById = async (
  id: number
): Promise<AdminSubcategory | undefined> => {
  const categoryList: AdminSubcategory[] = await fetchSubcategoriesList();
  const category = categoryList.find((item) => item.id === id);
  if (category) return category;
};

