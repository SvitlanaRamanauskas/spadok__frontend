export type AdminSubcategory = {
    name: string,
    key: string,
    category: string,
    id: string,
}

export type AdminCategory = {
    name: string,
    key: string,
    id: string,
}

export type AdminCategoriesData = {
    categories: AdminCategory[] | AdminSubcategory[];
}
