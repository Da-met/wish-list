
export enum AppRoutes {
    // MAIN = 'main',
    ABOUT = 'about',

    LOGIN = 'login',
    REGISTRATION = 'registration',

    LIST = 'list',
    LIST_DETAILS = 'list_details',

    PROFILE = 'profile',
    FRIENDS = 'friends',
    GIFTS_FRIENDS = 'gifts_friends',
    CALENDAR = 'calendar',
    NOTIFICATIONS = 'notifications',

    WISHES = 'wishes',
    WISH_DETAILS = 'wish_details',
    WISH_CREATE = 'wish_create',
    WISH_EDIT = 'wish_edit',

    COMPILATION_DETAILS = 'Compilation_details',

    NOT_FOUND = 'not_found',
    // RESERVED = "RESERVED"
}

export const getRouteMain = () => `/`;
export const getRouteAbout = () => `/about`;

export const getRouteList = () => `/list`;
export const getRouteListDetails = (id: string) => `/lists/${id}`;

export const getRouteLogin = () => `/login`;
export const getRouteRegistration = () => `/registration`;

export const getRouteProfile = (id: string) => `/profile/${id}`;

// export const getRouteFriends = (id: string) => `/friends/${id}`;
export const getRouteFriends = (id: string) => `/friends`;

export const getRouteGiftsFriends = (id: string) => `/gifts_friends/${id}`;
export const getRouteCalendar = (id: string) => `/calendar/${id}`;
export const getRouteNotifications = (id: string) => `/notifications/${id}`;

export const getRouteWishes = () => `/wishes`;
export const getRouteWishDetails = (id: string) => `/wishes/${id}`;
export const getRouteWishCreate = (idlist?: string) => `/wishes/new`;
export const getRouteWishEdit = (id: string) => `/wishes/${id}/edit`;

export const getRouteCompilationDetails = (id: string) => `/compilation/${id}`;




// export const RoutePath: Record<AppRoutes, string> = {
//     [AppRoutes.MAIN]: getRouteMain(),
//     [AppRoutes.ABOUT]: getRouteAbout(),

//     // [AppRoutes.PROFILE]: '/profile/', // +id 
//     [AppRoutes.PROFILE]: getRouteProfile(':id'), // +id 

//     [AppRoutes.WISHES]: getRouteWishes(),

//     // [AppRoutes.WISH_DETAILS]: '/wishes/', // +id wish
//     [AppRoutes.WISH_DETAILS]: getRouteWishDetails(':id'),
    
//     [AppRoutes.WISH_CREATE]: getRouteWishCreate(),
//     [AppRoutes.WISH_EDIT]: getRouteWishEdit(':id'), // +id wish

//     [AppRoutes.NOT_FOUND]: '*',
// }

