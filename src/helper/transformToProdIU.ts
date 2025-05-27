import { DynamicProduct, DynamicProductUI } from "../types/Product";
import { categoryMap, subcategoryMap } from "./recordsUI";

export function transformToProductUI(product: DynamicProduct): DynamicProductUI {

  const base = {
    id: product.id,
    category: categoryMap[product.categoryId],
    subcategory: subcategoryMap[product.subcategoryId],
    title: product.title,
    images: product.images,
    price: product.price,
    description: product.description,
    isAvailable: product.isAvailable,
  };

  if ("size" in product && "sizesAvailable" in product) {
    return {
      ...base,
      size: product.size,
      sizwsAvailable: product.sizesAvailable,
    }
  }

  if ("genre" in product) {
    return {
      ...base,
      genre: product.genre,
    }
  }

  return base;
}
