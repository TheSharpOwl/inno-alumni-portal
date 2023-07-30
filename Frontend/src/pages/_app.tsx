import React from 'react'
import { AppProps } from 'next/app';
import { GlobalContextProvider, StoreProvider } from 'context/store';
import { ErrorBoundary } from 'react-error-boundary';

import '../styles/globals.css';
import { useProtectedRoute } from 'context/useProtectedRoute';
import ErrorPage from './ErrorPage';

export default function MyApp({ Component, pageProps }: AppProps) {
  // useProtectedRoute();
  return (
    <GlobalContextProvider>
      <StoreProvider>
        <ErrorBoundary FallbackComponent={ErrorPage}>
          <Component {...pageProps} />
        </ErrorBoundary>
      </StoreProvider>
    </GlobalContextProvider>
  )
}
