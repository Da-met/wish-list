import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { ReservedWishesSchema } from '../types/reservedWishesSchema';
import { StateSchema } from '@/app/providers/StoreProvider';
import { fetchReservedWishes } from '../services/fetchReservedWishes';
import { Wish } from '@/entities/Wish';

// const reservedWishesAdapter = createEntityAdapter();


export const reservedWishesAdapter = createEntityAdapter<Wish>({
  selectId: (wish) => wish.id,
});
const initialState: ReservedWishesSchema = reservedWishesAdapter.getInitialState({
    isLoading: false,
    error: undefined,
});

export const reservedWishesSlice = createSlice({
    name: 'reservedWishes',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchReservedWishes.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(fetchReservedWishes.fulfilled, (state, action) => {
                state.isLoading = false;
                reservedWishesAdapter.setAll(state, action.payload);
                console.log('🧠 Данные, которые кладём в адаптер:', action.payload);
            })
            .addCase(fetchReservedWishes.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { reducer: reservedWishesReducer } = reservedWishesSlice;
export const { selectAll: getReservedWishes } = reservedWishesAdapter.getSelectors<StateSchema>(
    (state) => state.reservedWishes || reservedWishesAdapter.getInitialState()
);
