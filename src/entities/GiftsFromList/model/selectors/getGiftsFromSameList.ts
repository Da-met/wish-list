import { StateSchema } from "@/app/providers/StoreProvider";
import { getWishesByList, wishesAdapter } from "@/features/fetchWishesByListId/model/slice/wishesByListSlice";

// export const selectWishesByListState = (state: StateSchema) => state.wishesByList ?? wishesAdapter.getInitialState();

export const getGiftsFromSameList = (state: StateSchema, listId?: number, currentWishId?: number) => {
    if (!listId) return [];

    const list = state.listDetails?.data;
    if (!list || !Array.isArray(list.wishes)) return [];
    return list.wishes.filter((w) => w.id !== currentWishId);
    
};
  