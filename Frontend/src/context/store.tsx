'use client';

import { createContext, useContext, Dispatch, SetStateAction, useState, useEffect } from 'react';

type DataType = {
    firstName: string,
};

interface ContextProps {
    userId: string,
    setUserId: Dispatch<SetStateAction<string>>,
    userData: DataType[],
    setUserData: Dispatch<SetStateAction<DataType[]>>,
    token: string,
    setToken: Dispatch<SetStateAction<string>>,
}

interface IStore {
    isAuth: boolean;
    setIsAuth: Dispatch<SetStateAction<boolean>>;
    isReg: boolean;
    setIsReg: Dispatch<SetStateAction<boolean>>;
}

const GlobalContext = createContext<ContextProps>({
    userId: '',
    setUserId: (): string => '',
    userData: [],
    setUserData: (): DataType[] => [],
    token: '',
    setToken: (): string => '',
});

const Store = createContext<IStore>({
    isAuth: false,
    setIsAuth: () => {},
    isReg: false,
    setIsReg: () => {},
});

export const GlobalContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [userId, setUserId] = useState('');
    const [userData, setUserData] = useState<[] | DataType[]>([]);
    const [token, setToken] = useState(() => {
        if (typeof localStorage !== 'undefined') {
          return localStorage.getItem('innoToken') || '';
        }
        return '';
    });

    // const [userId, setUserId] = useState(() => {
    //     if (typeof localStorage !== 'undefined') {
    //       return localStorage.getItem('userId') || '';
    //     }
    //     return '';
    // });
    // const [userData, setUserData] = useState<[] | DataType[]>(() => {
    //     if (typeof localStorage !== 'undefined') {
    //       return JSON.parse(localStorage.getItem('userData') || '[]');
    //     }
    //     return [];
    // });

    // useEffect(() => {
    //     localStorage.setItem('userId', userId);
    // }, [userId]);

    // useEffect(() => {
    //     localStorage.setItem('userData', JSON.stringify(userData));
    // }, [userData]);

    useEffect(() => {
        localStorage.setItem('innoToken', token);
    }, [token]);

    return <GlobalContext.Provider value={{ userId, setUserId, userData, setUserData, token, setToken }}>{children}</GlobalContext.Provider>;
}

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
    const [isReg, setIsReg] = useState(false)
    const [isAuth, setIsAuth] = useState(() => {
        if (typeof localStorage !== 'undefined') {
          return localStorage.getItem('innoIsAuth') === 'true';
        }
        return false;
    });

    useEffect(() => {
        localStorage.setItem('innoIsAuth', String(isAuth));
    }, [isAuth]);

    return <Store.Provider value={{ isAuth, setIsAuth, isReg, setIsReg }}>{children}</Store.Provider>;
}

export const useGlobalContext = () => useContext(GlobalContext);

export const useStore = () => useContext(Store);
