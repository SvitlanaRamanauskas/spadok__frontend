import React, { useEffect, useMemo, useState } from 'react';
import { DynamicProduct } from '../types/Product';
import { AdminCategory, AdminSubcategory } from '../types/AdminNames';
import { fetchSubcategoriesList } from '../helper/fetch';


type ContextType = {
    selectedCard: DynamicProduct | null;
    setSelectedCard: (value: DynamicProduct | null) => void;
    selectedProduct: DynamicProduct | null;
    setSelectedProduct: (value: DynamicProduct | null) => void;
    asideIsOpen: boolean;
    setAsideIsOpen: (value: boolean) => void;
    isAuthenticated: boolean;
    setIsAuthenticated: (value: boolean) => void;
    subcategories: AdminSubcategory[] | [];
    setSubcategories: (value: AdminSubcategory[] | []) => void;
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
    subcategories: [],
    setSubcategories: () => {},
});

export const AppProvider: React.FC<Props> = ({ children }) => {
    const [selectedCard, setSelectedCard] = useState<DynamicProduct | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<DynamicProduct | null>(null);
    const [asideIsOpen, setAsideIsOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [subcategories, setSubcategories] = useState<AdminSubcategory[] | []>([])

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        setIsAuthenticated(!!token); // Якщо токен існує, вважаємо, що користувач авторизований
    }, []);
    
    useEffect(() => {
    const loadSubcategories = async () => {
        try {
            // const categories: AdminCategory[] = await fetchCategoriesList();
            // setCategories(categories);

            const subcategories: AdminSubcategory[] = await fetchSubcategoriesList();
            setSubcategories(subcategories);
            console.log("in app context ", subcategories)
        } catch (error) {
            console.error("Failed to fetch categories:", error);
        }    
    }

    loadSubcategories();
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
        subcategories,
        setSubcategories,
    }), [selectedCard, setSelectedCard, selectedProduct,
        setSelectedProduct, asideIsOpen, setAsideIsOpen, isAuthenticated, setIsAuthenticated, 
        subcategories, setSubcategories ]);

    return (
        <AppContext.Provider value={values}>{children}</AppContext.Provider>
    );
}
