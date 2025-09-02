import { createSlice, createEntityAdapter, PayloadAction } from '@reduxjs/toolkit';
import { Wish } from '@/entities/Wish';
import { fetchWishesByList } from '../services/fetchWishesByList';
import { WishesByListSchema } from '../types/wishesByListSchema';
import { setWishCompleted } from '@/entities/Wish/model/services/setWishCompleted/setWishCompleted';

export const wishesAdapter = createEntityAdapter<Wish>({
  selectId: (wish) => wish.id,
});

const initialState: WishesByListSchema = wishesAdapter.getInitialState({
  isLoading: false,
  error: undefined,
});

const wishesByListSlice = createSlice({
  name: 'wishesByList',
  initialState,
  reducers: {
    toggleWishCompleted: (state, action: PayloadAction<{ wishId: number; completed: boolean }>) => {
      const wish = state.entities[action.payload.wishId];
      if (wish) wish.completed = action.payload.completed;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishesByList.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(fetchWishesByList.fulfilled, (state, action: PayloadAction<Wish[]>) => {
        state.isLoading = false;
        wishesAdapter.setAll(state, action.payload);
      })
      .addCase(fetchWishesByList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })


      
      .addCase(setWishCompleted.fulfilled, (state, action) => {
        // обновим одну сущность
        wishesAdapter.upsertOne(state, action.payload);
      });
  },
});

export const { reducer: wishesByListReducer } = wishesByListSlice;

export const { selectAll: getWishesByList } = wishesAdapter.getSelectors(
  (state: { wishesByList: WishesByListSchema }) => state.wishesByList
);
