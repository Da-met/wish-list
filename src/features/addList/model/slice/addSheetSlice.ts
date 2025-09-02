import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider';
import { addSheetSchema } from '../types/addSheetSchema';


const initialState: addSheetSchema ={
    name: '',
    // error: '',
}


const addListSlice = createSlice({
    name: 'addList',
    initialState,
    reducers: {
        setName: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
        },
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(fetchFriendsList.pending, (state, action) => {
    //             state.error = undefined;
    //             state.isLoading = true;
    //         })
    //         .addCase(fetchFriendsList.fulfilled, ( state, action ) => {
    //             state.isLoading = false;
    //             listAdapter.setAll(state, action.payload);
    //         })
    //         .addCase(fetchFriendsList.rejected, (state, action) => {
    //             state.isLoading = false;
    //             state.error = action.payload;
    //         });
    // },
});

export const {
    reducer: addListSliceReducer,
    actions: addListSliceActions,
} = addListSlice;
