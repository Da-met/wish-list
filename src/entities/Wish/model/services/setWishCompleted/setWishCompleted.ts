import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Wish } from '../../types/wish';


export const setWishCompleted = createAsyncThunk<
  Wish,
  { id: number; completed: boolean },
  ThunkConfig<string>
>(
  'wishes/setCompleted',
  async ({ id, completed }, { extra, rejectWithValue }) => {
    try {
      const res = await extra.api.patch<Wish>(`/wish/${id}/completed`, { completed });
      if (!res.data) throw new Error();
      return res.data;
    } catch (e) {
      return rejectWithValue('Не удалось обновить статус подарка');
    }
  }
);