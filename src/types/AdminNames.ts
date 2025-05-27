export type AdminSubcategory = {
    name: string,
    key: string,
    categoryId: number,
    id: number,
    image: string,
}

export type AdminCategory = {
    name: string,
    key: string,
    id: number,
}

export type AdminCategoriesData = {
    categories: AdminCategory[] | AdminSubcategory[];
}
