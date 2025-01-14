import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AddWishFormSchema } from '../types/addWishForm';



const initialState: AddWishFormSchema = {
    isLoading: false,
    error: undefined,
    data: undefined,
};

export const addWishFormSlice = createSlice({
    name: 'addWishForm',
    initialState,
    reducers: {
        
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(loginByUsername.pending, (state) => {
    //             state.error = undefined;
    //             state.isLoading = true;
    //         })
    //         .addCase(loginByUsername.fulfilled, (state, action) => {
    //             state.isLoading = false;
    //         })
    //         .addCase(loginByUsername.rejected, (state, action) => {
    //             state.isLoading = false;
    //             state.error = action.payload;
    //         });
    // }
});

// Action creators are generated for each case reducer function
export const { actions: addWishFormActions } = addWishFormSlice;
export const { reducer: addWishFormReducer } = addWishFormSlice;