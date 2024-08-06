import React from 'react';


type ContextType = {

}

type Props = {
    children: React.ReactNode;
}

export const AppContext = React.createContext<ContextType>({});

export const AppProvider: React.FC<Props> = ({ children }) => {
    const values = {
        
    }
    return (
        <AppContext.Provider value={values}>{children}</AppContext.Provider>
    );
}
