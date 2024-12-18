import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { wishDetailsSchema } from '../types/wishDetailsSchema';
import { fetchWishById } from '../services/fetchWishById/fetchWishById';
import { Wish } from '../types/wish';




const initialState: wishDetailsSchema = {
    isLoading: false,
    error: undefined,
    data: undefined,
};

export const wishDetailsSlice = createSlice({
    name: 'wishDetails',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWishById.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchWishById.fulfilled, (
                state,
                action: PayloadAction<Wish>,
            ) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchWishById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },

});

// Action creators are generated for each case reducer function
export const { actions: wishDetailsActions } = wishDetailsSlice;
export const { reducer: wishDetailsReducer } = wishDetailsSlice;