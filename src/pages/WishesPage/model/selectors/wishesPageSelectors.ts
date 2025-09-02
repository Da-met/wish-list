import { StateSchema } from '@/app/providers/StoreProvider';
import { WishesSortField } from '@/entities/Wish';



export const getWishesPageIsLoading = (state: StateSchema) => state.wishesPage?.isLoading || false;
export const getWishesPageError = (state: StateSchema) => state.wishesPage?.error;

export const getWishesPageNum = (state: StateSchema) => state.wishesPage?.page || 1;
export const getWishesPageLimit = (state: StateSchema) => state.wishesPage?.limit || 6;
export const getWishesPageHasMore = (state: StateSchema) => state.wishesPage?.hasMore;


export const getWishesPageInited = (state: StateSchema) => state.wishesPage?._inited;

export const getWishesPageOrder = (state: StateSchema) => state.wishesPage?.order ?? 'asc';
export const getWishesPageSort = (state: StateSchema) => state.wishesPage?.sort ?? WishesSortField.CREATED;

export const getWishesPageSearch = (state: StateSchema) => state.wishesPage?.search ?? '';


export const getWishesPageScope = (state: StateSchema) => state.wishesPage?.scope ?? 'all';
export const getWishesPageStatus = (state: StateSchema) => state.wishesPage?.status ?? 'active';
