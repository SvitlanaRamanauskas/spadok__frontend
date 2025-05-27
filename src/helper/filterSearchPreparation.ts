import { DynamicProduct } from "../types/Product";

export const includesQuery = (productsName: string | null, input: string) => {
  return productsName
    ?.trim()
    .toLowerCase()
    .includes(input.trim().toLowerCase());
};

export const getPreparedProducts = (
  products: DynamicProduct[],
  params: any
) => {
  const preparedProducts = [...products];

  if (params.query) {
    return preparedProducts.filter((prod) => {
      return includesQuery(prod.title, params.query);
    });
  }

  if (params.sort) {
    return preparedProducts.sort((a, b) => {
      if (params.sort === "алфавітом") {
        return a.title.localeCompare(b.title);
      } else if (params.sort === "дешевші") {
        return a.price - b.price;
      } else if (params.sort === "дорожчі") {
        return b.price - a.price;
      } else {
        return 0;
      }
    });
  }

  return preparedProducts;
};
