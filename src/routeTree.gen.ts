/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import {createFileRoute} from '@tanstack/react-router';

// Import Routes

import {Route as rootRoute} from './routes/__root';
import {Route as AuthImport} from './routes/_auth';
import {Route as AppImport} from './routes/_app';
import {Route as AuthSignupImport} from './routes/_auth/signup';
import {Route as AuthSigninImport} from './routes/_auth/signin';

// Create Virtual Routes

const AppIndexLazyImport = createFileRoute('/_app/')();
const AppDashboardLazyImport = createFileRoute('/_app/dashboard')();

// Create/Update Routes

const AuthRoute = AuthImport.update({
  id: '/_auth',
  getParentRoute: () => rootRoute,
} as any);

const AppRoute = AppImport.update({
  id: '/_app',
  getParentRoute: () => rootRoute,
} as any);

const AppIndexLazyRoute = AppIndexLazyImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => AppRoute,
} as any).lazy(() => import('./routes/_app/index.lazy').then((d) => d.Route));

const AppDashboardLazyRoute = AppDashboardLazyImport.update({
  id: '/dashboard',
  path: '/dashboard',
  getParentRoute: () => AppRoute,
} as any).lazy(() =>
  import('./routes/_app/dashboard.lazy').then((d) => d.Route),
);

const AuthSignupRoute = AuthSignupImport.update({
  id: '/signup',
  path: '/signup',
  getParentRoute: () => AuthRoute,
} as any);

const AuthSigninRoute = AuthSigninImport.update({
  id: '/signin',
  path: '/signin',
  getParentRoute: () => AuthRoute,
} as any);

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_app': {
      id: '/_app';
      path: '';
      fullPath: '';
      preLoaderRoute: typeof AppImport;
      parentRoute: typeof rootRoute;
    };
    '/_auth': {
      id: '/_auth';
      path: '';
      fullPath: '';
      preLoaderRoute: typeof AuthImport;
      parentRoute: typeof rootRoute;
    };
    '/_auth/signin': {
      id: '/_auth/signin';
      path: '/signin';
      fullPath: '/signin';
      preLoaderRoute: typeof AuthSigninImport;
      parentRoute: typeof AuthImport;
    };
    '/_auth/signup': {
      id: '/_auth/signup';
      path: '/signup';
      fullPath: '/signup';
      preLoaderRoute: typeof AuthSignupImport;
      parentRoute: typeof AuthImport;
    };
    '/_app/dashboard': {
      id: '/_app/dashboard';
      path: '/dashboard';
      fullPath: '/dashboard';
      preLoaderRoute: typeof AppDashboardLazyImport;
      parentRoute: typeof AppImport;
    };
    '/_app/': {
      id: '/_app/';
      path: '/';
      fullPath: '/';
      preLoaderRoute: typeof AppIndexLazyImport;
      parentRoute: typeof AppImport;
    };
  }
}

// Create and export the route tree

interface AppRouteChildren {
  AppDashboardLazyRoute: typeof AppDashboardLazyRoute;
  AppIndexLazyRoute: typeof AppIndexLazyRoute;
}

const AppRouteChildren: AppRouteChildren = {
  AppDashboardLazyRoute: AppDashboardLazyRoute,
  AppIndexLazyRoute: AppIndexLazyRoute,
};

const AppRouteWithChildren = AppRoute._addFileChildren(AppRouteChildren);

interface AuthRouteChildren {
  AuthSigninRoute: typeof AuthSigninRoute;
  AuthSignupRoute: typeof AuthSignupRoute;
}

const AuthRouteChildren: AuthRouteChildren = {
  AuthSigninRoute: AuthSigninRoute,
  AuthSignupRoute: AuthSignupRoute,
};

const AuthRouteWithChildren = AuthRoute._addFileChildren(AuthRouteChildren);

export interface FileRoutesByFullPath {
  '': typeof AuthRouteWithChildren;
  '/signin': typeof AuthSigninRoute;
  '/signup': typeof AuthSignupRoute;
  '/dashboard': typeof AppDashboardLazyRoute;
  '/': typeof AppIndexLazyRoute;
}

export interface FileRoutesByTo {
  '': typeof AuthRouteWithChildren;
  '/signin': typeof AuthSigninRoute;
  '/signup': typeof AuthSignupRoute;
  '/dashboard': typeof AppDashboardLazyRoute;
  '/': typeof AppIndexLazyRoute;
}

export interface FileRoutesById {
  __root__: typeof rootRoute;
  '/_app': typeof AppRouteWithChildren;
  '/_auth': typeof AuthRouteWithChildren;
  '/_auth/signin': typeof AuthSigninRoute;
  '/_auth/signup': typeof AuthSignupRoute;
  '/_app/dashboard': typeof AppDashboardLazyRoute;
  '/_app/': typeof AppIndexLazyRoute;
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath;
  fullPaths: '' | '/signin' | '/signup' | '/dashboard' | '/';
  fileRoutesByTo: FileRoutesByTo;
  to: '' | '/signin' | '/signup' | '/dashboard' | '/';
  id:
    | '__root__'
    | '/_app'
    | '/_auth'
    | '/_auth/signin'
    | '/_auth/signup'
    | '/_app/dashboard'
    | '/_app/';
  fileRoutesById: FileRoutesById;
}

export interface RootRouteChildren {
  AppRoute: typeof AppRouteWithChildren;
  AuthRoute: typeof AuthRouteWithChildren;
}

const rootRouteChildren: RootRouteChildren = {
  AppRoute: AppRouteWithChildren,
  AuthRoute: AuthRouteWithChildren,
};

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>();

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/_app",
        "/_auth"
      ]
    },
    "/_app": {
      "filePath": "_app.tsx",
      "children": [
        "/_app/dashboard",
        "/_app/"
      ]
    },
    "/_auth": {
      "filePath": "_auth.tsx",
      "children": [
        "/_auth/signin",
        "/_auth/signup"
      ]
    },
    "/_auth/signin": {
      "filePath": "_auth/signin.tsx",
      "parent": "/_auth"
    },
    "/_auth/signup": {
      "filePath": "_auth/signup.tsx",
      "parent": "/_auth"
    },
    "/_app/dashboard": {
      "filePath": "_app/dashboard.lazy.tsx",
      "parent": "/_app"
    },
    "/_app/": {
      "filePath": "_app/index.lazy.tsx",
      "parent": "/_app"
    }
  }
}
ROUTE_MANIFEST_END */
