import { StateSchema } from '@/app/providers/StoreProvider';




export const getFriendsPageIsLoading = (state: StateSchema) => state.friends?.isLoading || false;
export const getFriendsPageError = (state: StateSchema) => state.friends?.error;

export const getFriendsIds = (state: StateSchema) => state.friends?.ids;
