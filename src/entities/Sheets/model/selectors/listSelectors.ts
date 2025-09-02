import { StateSchema } from "@/app/providers/StoreProvider";




export const getListsIsLoading = (state: StateSchema) => state.lists?.isLoading || false;
export const getListsError = (state: StateSchema) => state.lists?.error;

// export const getFriendsIds = (state: StateSchema) => state.friends?.ids;