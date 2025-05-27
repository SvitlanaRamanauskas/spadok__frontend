import React, { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { DynamicProduct } from '../types/Product';
import { AdminCategory, AdminSubcategory } from '../types/AdminNames';
import { fetchAllProducts } from '../helper/fetch/fetch';
import { fetchCategoriesList, fetchSubcategoriesList } from '../helper/fetch/adminFetch';


type ContextType = {
    selectedCard: DynamicProduct | null;
    setSelectedCard: (value: DynamicProduct | null) => void;
    selectedProduct: DynamicProduct | null;
    setSelectedProduct: (value: DynamicProduct | null) => void;
    asideIsOpen: boolean;
    setAsideIsOpen: Dispatch<SetStateAction<boolean>>;
    isAuthenticated: boolean;
    setIsAuthenticated: (value: boolean) => void;
    categories: AdminCategory[];
    setCategories: Dispatch<SetStateAction<AdminCategory[]>>;
    subcategories: AdminSubcategory[];
    setSubcategories: (value: AdminSubcategory[]) => void;
    products: DynamicProduct[];
    setProducts: (value: DynamicProduct[]) => void;
}

type Props = {
    children: React.ReactNode;
}

export const AppContext = React.createContext<ContextType>({
    selectedCard: null,
    setSelectedCard: () => {},
    selectedProduct: null,
    setSelectedProduct: () => {},
    asideIsOpen: false,
    setAsideIsOpen: () => {},
    isAuthenticated: false,
    setIsAuthenticated: () => {},
    categories: [],
    setCategories: () => {},
    subcategories: [],
    setSubcategories: () => {},
    products: [],
    setProducts: () => {},
    
});

export const AppProvider: React.FC<Props> = ({ children }) => {
    const [selectedCard, setSelectedCard] = useState<DynamicProduct | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<DynamicProduct | null>(null);
    const [asideIsOpen, setAsideIsOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [categories, setCategories] = useState<AdminCategory[]>([])
    const [subcategories, setSubcategories] = useState<AdminSubcategory[]>([])
    const [products, setProducts] = useState<DynamicProduct[]>([])

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        setIsAuthenticated(!!token); // Якщо токен існує, вважаємо, що користувач авторизований
    }, []);
    
    useEffect(() => {
    const loadSubcategories = async () => {
        try {
            const subcategories: AdminSubcategory[] = await fetchSubcategoriesList();
            setSubcategories(subcategories);
        } catch (error) {
            console.error("Failed to fetch categories:", error);
        }
    }

    const loadCategories = async () => {
        try {
            const categories: AdminCategory[] = await fetchCategoriesList();
            setCategories(categories);
        } catch (error) {
            console.error("Failed to fetch subcategories:", error);
        }
    }

    const loadAllProducts = async () => {
        try {
            const products: DynamicProduct[] = await fetchAllProducts();
            setProducts(products);
        } catch (error) {
            console.error("Failed to fetch products:", error);
        }
    }
    
    loadCategories();
    loadSubcategories();
    loadAllProducts();
    }, []);

    // useEffect(() => {
    //     if (selectedProduct) {
    //       localStorage.setItem('selectedProduct', JSON.stringify(selectedProduct));
    //     } else {
    //       localStorage.removeItem('selectedProduct');
    //     }
    // }, [selectedProduct]);

    // useEffect(() => {
    //     if (selectedCard !== null) {
    //         localStorage.setItem('selectedCard', JSON.stringify(selectedCard));
    //     }
    // }, [selectedCard]);

    // console.log(selectedCard, selectedProduct);

    const values = useMemo(() => ({
        selectedCard,
        setSelectedCard,
        selectedProduct,
        setSelectedProduct,
        asideIsOpen,
        setAsideIsOpen,
        isAuthenticated,
        setIsAuthenticated,
        categories,
        setCategories,
        subcategories,
        setSubcategories,
        products,
        setProducts
    }), [selectedCard, setSelectedCard, selectedProduct,
        setSelectedProduct, asideIsOpen, setAsideIsOpen, isAuthenticated, setIsAuthenticated, 
        categories, setCategories, subcategories, setSubcategories, products, setProducts ]);

    return (
        <AppContext.Provider value={values}>{children}</AppContext.Provider>
    );
}
