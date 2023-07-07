import { useEffect } from 'react';
import { useRouter } from "next/router";
import { useStore } from './store';

export const useProtectedRoute = () => {
  const { isAuth: storeIsAuth } = useStore();
  let localIsAuth;
  const route = useRouter();
  if (typeof localStorage !== 'undefined') {
    localIsAuth = localStorage.getItem('innoIsAuth');
  }
  const isAuth = localIsAuth ? JSON.parse(localIsAuth) : storeIsAuth;

  useEffect(() => {
    if (!isAuth && !['/login', '/register'].includes(route.pathname)) {
      route.push('/login');
    }
  }, [isAuth, route]);
};