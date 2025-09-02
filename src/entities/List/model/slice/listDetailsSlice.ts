import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchListById } from '../services/fetchListById';
import { List, ListDetailsSchema } from '../types/listDetailsSchema';




const initialState: ListDetailsSchema  = {
    isLoading: false,
};

export const listDetailsSlice = createSlice({
    name: 'listDetails',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchListById.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(fetchListById.fulfilled, (state, action: PayloadAction<List>) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchListById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

export const { reducer: listDetailsReducer } = listDetailsSlice;