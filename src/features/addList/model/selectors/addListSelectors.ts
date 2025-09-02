import { StateSchema } from "@/app/providers/StoreProvider";


export const getAddListName = (state: StateSchema) => state.addSheet?.name;
export const getAddListError = (state: StateSchema) => state.addSheet?.error;

// export const getWishDetailsIsLoading = (state: StateSchema) => state.wishDetails?.isLoading;
// 