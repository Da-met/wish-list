import { AboutPage } from "pages/AboutPage"
import { MainPage } from "pages/MainPage"
import { NotFoundPage } from "pages/NotFoundPage"
import { ProfilePage } from "pages/ProfilePage"
import { WishDetailsPage } from "pages/WisheDetailsPage"
import { WishEditPage } from "pages/WishEditPage"
import { WishesPage } from "pages/WishesPage"

import { RouteProps } from "react-router-dom"

export type AppRoutesProps = RouteProps & {
    authOnly?: boolean;
}

export enum AppRoutes {
    MAIN = 'main',
    ABOUT = 'about',
    PROFILE = 'profile',
    WISHES = 'wishes',
    WISH_DETAILS = 'wish_details',
    WISH_CREATE = 'wish_create',
    WISH_EDIT = 'wish_edit',

    NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.ABOUT]: '/about',
    [AppRoutes.PROFILE]: '/profile/', // +id 
    [AppRoutes.WISHES]: '/wishes',
    [AppRoutes.WISH_DETAILS]: '/wishes/', // +id wish
    [AppRoutes.WISH_CREATE]: '/wishes/new', 
    [AppRoutes.WISH_EDIT]: '/wishes/:id/edit', // +id wish

    [AppRoutes.NOT_FOUND]: '*',
}

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <MainPage />
    },
    [AppRoutes.ABOUT]: {
        path: RoutePath.about,
        element: <AboutPage />
    },
    [AppRoutes.PROFILE]: {
        path: `${RoutePath.profile}:id`,
        element: <ProfilePage />,
        authOnly: true,
    },
    [AppRoutes.WISHES]: {
        path: RoutePath.wishes,
        element: <WishesPage />,
        // authOnly: true,
    },
    [AppRoutes.WISH_DETAILS]: {
        path: `${RoutePath.wish_details}:id`,
        element: <WishDetailsPage />,
        // authOnly: true,
    },
    [AppRoutes.WISH_CREATE]: {
        path: `${RoutePath.wish_create}`,
        element: <WishEditPage />,
        authOnly: true,
    },
    [AppRoutes.WISH_EDIT]: {
        path: `${RoutePath.wish_edit}`,
        element: <WishEditPage />,
        authOnly: true,
    },


    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <NotFoundPage />,
    },
}