import { StateSchema } from '@/app/providers/StoreProvider';

export const getReservedWishesLoading = (state: StateSchema) => state.reservedWishes?.isLoading;
export const getReservedWishesError = (state: StateSchema) => state.reservedWishes?.error;
