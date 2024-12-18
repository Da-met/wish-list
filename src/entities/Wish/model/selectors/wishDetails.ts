import { StateSchema } from "app/providers/StoreProvider";


export const getWishDetailsData = (state: StateSchema) => state.wishDetails?.data;
export const getWishDetailsIsLoading = (state: StateSchema) => state.wishDetails?.isLoading;
export const getWishDetailsError = (state: StateSchema) => state.wishDetails?.error;