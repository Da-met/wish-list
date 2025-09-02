import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider';
import { Friend } from '../types/friend';
import { FriendsPageSchema } from '../types/friendsPageSchema';
import { fetchFriendsList } from '../services/fetchFriendsList/fetchFriendsList';



const friendsAdapter = createEntityAdapter<Friend>({
    selectId: (friend) => friend.id,
});

export const getFriends = friendsAdapter.getSelectors<StateSchema>(
    (state) => state.friends || friendsAdapter.getInitialState(),
);


const friendsPageSlice = createSlice({
    name: 'friendsPageSlice',
    initialState: friendsAdapter.getInitialState<FriendsPageSchema>({
        isLoading: false,
        error: undefined,
        entities: {},
        ids: [],
    }),
    reducers: {

    },
    extraReducers: (builder) => {
            builder
                .addCase(fetchFriendsList.pending, (state, action) => {
                    state.error = undefined;
                    state.isLoading = true;
                })
                .addCase(fetchFriendsList.fulfilled, ( state, action ) => {
                    state.isLoading = false;
                    friendsAdapter.setAll(state, action.payload);
                })
                .addCase(fetchFriendsList.rejected, (state, action) => {
                    state.isLoading = false;
                    state.error = action.payload;
                });
        },
});

export const {
    reducer: friendsPageReducer,
    actions: friendsPageActions,
} = friendsPageSlice;
