import { StateSchema } from "@/app/providers/StoreProvider";
import { getWishesByList } from "@/features/fetchWishesByListId/model/slice/wishesByListSlice";


export const getWishDetailsData = (state: StateSchema) => state.wishDetails?.data;
export const getWishDetailsIsLoading = (state: StateSchema) => state.wishDetails?.isLoading;
export const getWishDetailsError = (state: StateSchema) => state.wishDetails?.error;


export const getWishDetailsCompleted = (state: StateSchema) => state.wishDetails?.data?.completed;

// export const selectActiveWishesByList = (state: StateSchema, listId: number) =>
//     getWishesByList(state).filter(w => w.list_id === listId && !w.completed);
  
// export const selectCompletedWishesByList = (state: StateSchema, listId: number) =>
//     getWishesByList(state).filter(w => w.list_id === listId && w.completed);