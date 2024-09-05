import React, { useMemo, useState } from 'react';
import { VyshyvankaDetails } from '../types/VyshyvankaDetails';


type ContextType = {
    selectedProduct: VyshyvankaDetails | null;
    setSelectedProduct: (value: VyshyvankaDetails) => void;
    asideIsOpen: boolean;
    setAsideIsOpen: (calue: boolean) => void;
}

type Props = {
    children: React.ReactNode;
}

export const AppContext = React.createContext<ContextType>({
    selectedProduct: null,
    setSelectedProduct: () => {},
    asideIsOpen: false,
    setAsideIsOpen: () => {},
});

export const AppProvider: React.FC<Props> = ({ children }) => {

    const [selectedProduct, setSelectedProduct] = useState<VyshyvankaDetails | null>(null);
    const [asideIsOpen, setAsideIsOpen] = useState(false);

    const values = useMemo(() => ({
        selectedProduct,
        setSelectedProduct,
        asideIsOpen,
        setAsideIsOpen,
    }), [selectedProduct, setSelectedProduct, asideIsOpen, setAsideIsOpen,]);

    return (
        <AppContext.Provider value={values}>{children}</AppContext.Provider>
    );
}
