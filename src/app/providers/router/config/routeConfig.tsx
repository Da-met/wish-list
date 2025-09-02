import { GiftsFriendsList } from "@/entities/GiftsFriends"
import { AboutPage } from "@/pages/AboutPage"
import { CalendarPage } from "@/pages/CalendarPage"
import { CompilationsDetailsPage } from "@/pages/CompilationsDetailsPage"

import { FriendsPage } from "@/pages/FriendsPage/index"
import { GiftsFriendsPage } from "@/pages/GiftsFriendsPage"
import { ListDetailsPage } from "@/pages/ListDetails"
import { ListPage } from "@/pages/ListPage"
import { LoginPage } from "@/pages/LoginPage"

import { MainPage } from "@/pages/MainPage"
import { NotFoundPage } from "@/pages/NotFoundPage"
import { NotificationsPage } from "@/pages/NotificationsPage"
import { ProfilePage } from "@/pages/ProfilePage"
import { RegistrationPage } from "@/pages/RegastrationPage"
import { WishDetailsPage } from "@/pages/WisheDetailsPage"
import { WishEditPage } from "@/pages/WishEditPage"
import { WishesPage } from "@/pages/WishesPage"
import { 
    AppRoutes, 
    getRouteAbout, 
    getRouteCalendar, 
    getRouteCompilationDetails, 
    getRouteFriends, 
    getRouteGiftsFriends, 
    getRouteList, 
    getRouteListDetails, 
    getRouteLogin, 
    // getRouteMain, 
    getRouteNotifications, 
    getRouteProfile, 
    getRouteRegistration, 
    getRouteWishCreate, 
    getRouteWishDetails, 
    getRouteWishEdit, 
    getRouteWishes, 
    // RoutePath 
} from "@/shared/const/router"
import { AppRoutesProps } from "@/shared/types/router"

export const getRouteMain = () => getRouteWishes();
export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
    // [AppRoutes.MAIN]: {
    //     path: getRouteMain(),
    //     element: <MainPage />
    // },
    [AppRoutes.ABOUT]: {
        path: getRouteAbout(),
        element: <AboutPage />
    },
    [AppRoutes.LIST]: {
        path: getRouteList(),
        element: <ListPage />
    },
    [AppRoutes.LIST_DETAILS]: {
        path: getRouteListDetails(String(':id')),
        element: <ListDetailsPage />,
    },

    [AppRoutes.LOGIN]: {
        path: getRouteLogin(),
        element: <LoginPage />
    },
    [AppRoutes.REGISTRATION]: {
        path: getRouteRegistration(),
        element: <RegistrationPage />
    },

    [AppRoutes.PROFILE]: {
        path: getRouteProfile(String(':id')),
        element: <ProfilePage />,
        // authOnly: true,
    },
    [AppRoutes.FRIENDS]: {
        path: getRouteFriends(String(':id')),
        element: <FriendsPage />,
        // authOnly: true,
    },
    [AppRoutes.WISHES]: {
        path: getRouteWishes(),
        element: <WishesPage />,
        // authOnly: true,
    },
    [AppRoutes.WISH_DETAILS]: {
        path: getRouteWishDetails(String(':id')),
        element: <WishDetailsPage />,
        // authOnly: true,
    },
    [AppRoutes.WISH_CREATE]: {
        path: getRouteWishCreate(),
        element: <WishEditPage />,
        authOnly: true,
    },
    [AppRoutes.WISH_EDIT]: {
        path: getRouteWishEdit(String(':id')),
        element: <WishEditPage />,
        authOnly: true,
    },
    [AppRoutes.GIFTS_FRIENDS]: {
        path: getRouteGiftsFriends(String(':id')),
        element: <GiftsFriendsPage />,
        authOnly: true,
    },
    [AppRoutes.CALENDAR]: {
        path: getRouteCalendar(String(':id')),
        element: <CalendarPage />,
        authOnly: true,
    },
    [AppRoutes.NOTIFICATIONS]: {
        path: getRouteNotifications(String(':id')),
        element: <NotificationsPage />,
        authOnly: true,
    },
    [AppRoutes.COMPILATION_DETAILS]: {
        path: getRouteCompilationDetails(String(':id')),
        element: <CompilationsDetailsPage />,
        // authOnly: true,
    },



    [AppRoutes.NOT_FOUND]: {
        path: '*',
        element: <NotFoundPage />,
    },

}