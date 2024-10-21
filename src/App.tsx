import {RouterProvider, createRouter} from '@tanstack/react-router';
import React from 'react';

// Import the generated route tree
import {routeTree} from './routeTree.gen';
import QueryProvider from './lib/react-query/QueryProvider';
import AuthContextProvider from './context/AuthContextProvider';
import {ModalProvider} from './context/ModalContext';
import NotFound404 from './layouts/NotFound404';

// Create a new router instance
const router = createRouter({
  routeTree,
  defaultNotFoundComponent: NotFound404,
});

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const App = () => {
  return (
    <AuthContextProvider>
      <ModalProvider>
        <QueryProvider>
          <RouterProvider router={router} />
        </QueryProvider>
      </ModalProvider>
    </AuthContextProvider>
  );
};

export default App;
