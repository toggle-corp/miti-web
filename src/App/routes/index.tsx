import {
    MyInputIndexRouteObject,
    MyInputNonIndexRouteObject,
    MyOutputIndexRouteObject,
    MyOutputNonIndexRouteObject,
    unwrapRoute,
    wrapRoute,
} from '#utils/routes';
import { Component as RootLayout } from '#views/RootLayout';

import PageError from '../PageError';

// NOTE: setting default ExtendedProps
export type ExtendedProps = {
    title: string,
};

export interface MyWrapRoute {
    <T>(
        myRouteOptions: MyInputIndexRouteObject<T, ExtendedProps>
    ): MyOutputIndexRouteObject<ExtendedProps>
    <T>(
        myRouteOptions: MyInputNonIndexRouteObject<T, ExtendedProps>
    ): MyOutputNonIndexRouteObject<ExtendedProps>
}

const customWrapRoute: MyWrapRoute = wrapRoute;

const rootLayout = customWrapRoute({
    path: '/',
    errorElement: <PageError />,
    component: {
        render: RootLayout,
        eagerLoad: true,
        props: {},
    },
    context: {
        title: 'Miti',
    },
});

const home = customWrapRoute({
    parent: rootLayout,
    index: true,
    component: {
        render: () => import('#views/Home'),
        props: {},
    },
    context: {
        title: 'Home',
    },
});

const pageNotFound = customWrapRoute({
    parent: rootLayout,
    path: '*',
    component: {
        render: () => import('#views/PageNotFound'),
        props: {},
    },
    context: {
        title: '404',
    },
});

const wrappedRoutes = {
    rootLayout,
    home,
    pageNotFound,
};

export const unwrappedRoutes = unwrapRoute(Object.values(wrappedRoutes));

export default wrappedRoutes;

export type WrappedRoutes = typeof wrappedRoutes;
