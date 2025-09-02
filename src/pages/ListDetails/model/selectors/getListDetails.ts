import { StateSchema } from '@/app/providers/StoreProvider';

export const getListDetailsData = (state: StateSchema) => state.listDetails?.data;
export const getListDetailsLoading = (state: StateSchema) => state.listDetails?.isLoading;
export const getListDetailsError = (state: StateSchema) => state.listDetails?.error;