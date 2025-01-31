export type AdminSubcategory = {
    name: string,
    key: string
}

export type AdminCategory = {
    name: string,
    key: string,
    subcategories: AdminCategory[];
}

export type AdminCategoriesData = {
    categories: AdminCategory[];
}