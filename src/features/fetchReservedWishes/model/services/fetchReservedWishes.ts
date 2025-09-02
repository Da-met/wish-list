import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Wish } from '@/entities/Wish';
import { $api } from '@/shared/api/api';


interface Reservation {
    id: number;
    user_id: number;
    wish_id: number;
    wish: Wish;
  }
  
  export const fetchReservedWishes = createAsyncThunk<Wish[], void, ThunkConfig<string>>(
    'reservedWishes/fetchReservedWishes',
    async (_, thunkAPI) => {
      const { extra, rejectWithValue } = thunkAPI;
      // console.log('extra.api', extra.api === $api)

      try {
        const response = await extra.api.get<Reservation[]>('/reservation/my-reservations');
        
        const wishes = response.data
          .map((reservation) => reservation.wish)
          .filter(Boolean); // убираем null

          // console.log('🎁 Выделенные wishes:', wishes);

        return wishes;
      } catch (e) {
        console.error(e);
        return rejectWithValue('Ошибка при загрузке зарезервированных подарков');
      }
    }
  );