'use client';

import { createContext, useContext, Dispatch, SetStateAction, useState } from 'react';

type DataType = {
    firstName: string,
};

interface ContextProps {
    userId: string,
    setUserId: Dispatch<SetStateAction<string>>,
    data: DataType[],
    setData: Dispatch<SetStateAction<DataType[]>>,
}

interface IStore {
    isAuth: boolean;
    setIsAuth: Dispatch<SetStateAction<boolean>>;
}

const GlobalContext = createContext<ContextProps>({
    userId: '',
    setUserId: (): string => '',
    data: [],
    setData: (): DataType[] => [],
});

const Store = createContext<IStore>({
    isAuth: false,
    setIsAuth: () => {},
});

export const GlobalContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [userId, setUserId] = useState('');
    const [data, setData] = useState<[] | DataType[]>([]);

    return <GlobalContext.Provider value={{ userId, setUserId, data, setData }}>{children}</GlobalContext.Provider>;
}

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuth, setIsAuth] = useState(false);

    return <Store.Provider value={{ isAuth, setIsAuth }}>{children}</Store.Provider>;
}

export const useGlobalContext = () => useContext(GlobalContext);

export const useStore = () => useContext(Store);
