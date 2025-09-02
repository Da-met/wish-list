import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { wishDetailsSchema } from '../types/wishDetailsSchema';
import { fetchWishById } from '../services/fetchWishById/fetchWishById';
import { Wish } from '../types/wish';
import { deleteWish } from '../services/deleteWish/deleteWish';
import { setWishCompleted } from '../services/setWishCompleted/setWishCompleted';
import { wishesAdapter } from '@/features/fetchWishesByListId/model/slice/wishesByListSlice';




const initialState: wishDetailsSchema = {
    isLoading: false,
    error: undefined,
    data: undefined,
};

export const wishDetailsSlice = createSlice({
    name: 'wishDetails',
    initialState,
    reducers: {
        // ⬅️ подумать:
        clear: (state) => {
            state.data = undefined;
            state.error = undefined;
            state.isLoading = true;  // показываем скелетон сразу
          },
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
            })

            .addCase(deleteWish.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(deleteWish.fulfilled, (state) => {
                state.isLoading = false;
                state.data = undefined; 
            })
            .addCase(deleteWish.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(setWishCompleted.fulfilled, (state, action) => {
                if (state.data?.id === action.payload.id) {
                  state.data.completed = action.payload.completed;
                }
            });
    },

});

// Action creators are generated for each case reducer function
export const { actions: wishDetailsActions } = wishDetailsSlice;
export const { reducer: wishDetailsReducer } = wishDetailsSlice;