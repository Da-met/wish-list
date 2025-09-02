import { StateSchema } from "@/app/providers/StoreProvider";


export const getAddWishNameState = (state: StateSchema) => state.addWishForm?.name;
export const getAddWishDescriptionState = (state: StateSchema) => state.addWishForm?.description;
export const getAddWishImgState = (state: StateSchema) => state.addWishForm?.img;
export const getAddWishUrlState = (state: StateSchema) => state.addWishForm?.url;
export const getAddWishListIdState = (state: StateSchema) => state.addWishForm?.list_id;





