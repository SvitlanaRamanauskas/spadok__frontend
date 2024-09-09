import React, { useEffect, useMemo, useState } from 'react';
import { VyshyvankaDetails } from '../types/VyshyvankaDetails';
import { Vyshyvanka } from '../types/Vyshyvanka';


type ContextType = {
    selectedCard: Vyshyvanka | null;
    setSelectedCard: (value: Vyshyvanka | null) => void;
    selectedProduct: VyshyvankaDetails | null;
    setSelectedProduct: (value: VyshyvankaDetails | null) => void;
    asideIsOpen: boolean;
    setAsideIsOpen: (value: boolean) => void;
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
});

export const AppProvider: React.FC<Props> = ({ children }) => {
    const [selectedCard, setSelectedCard] = useState<Vyshyvanka | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<VyshyvankaDetails | null>(null);

    const [asideIsOpen, setAsideIsOpen] = useState(false);

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
    }), [selectedCard, setSelectedCard, selectedProduct, setSelectedProduct, asideIsOpen, setAsideIsOpen,]);

    return (
        <AppContext.Provider value={values}>{children}</AppContext.Provider>
    );
}
