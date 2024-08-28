import React, { useMemo, useState } from 'react';
import { VyshyvankaDetails } from '../types/VyshyvankaDetails';


type ContextType = {
    selectedProduct:VyshyvankaDetails | null,
    setSelectedProduct: (value: VyshyvankaDetails) => void;
}

type Props = {
    children: React.ReactNode;
}

export const AppContext = React.createContext<ContextType>({
    selectedProduct: null,
    setSelectedProduct: () => {},
});

export const AppProvider: React.FC<Props> = ({ children }) => {

    const [selectedProduct, setSelectedProduct] = useState<VyshyvankaDetails | null>(null);
    const values = useMemo(() => ({
        selectedProduct,
        setSelectedProduct,
    }), [selectedProduct, setSelectedProduct]);

    return (
        <AppContext.Provider value={values}>{children}</AppContext.Provider>
    );
}
