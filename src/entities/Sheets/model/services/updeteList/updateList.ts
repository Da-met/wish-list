import { createAsyncThunk } from '@reduxjs/toolkit';
import { List } from '../../types/list';
import { ThunkConfig } from '@/app/providers/StoreProvider';


interface UpdateListProps {
  id: number;
  name: string;
}

export const updateList = createAsyncThunk<
  List,                   // fulfilled-payload
  UpdateListProps,        // аргументы
  ThunkConfig<string>     // тип rejectWithValue
>(
  'list/updateList',
  async ({ id, name }, { extra, rejectWithValue }) => {
    try {
      const res = await extra.api.put(`/lists/${id}`, { name });
      return (res.data as { list: List }).list;                        
    } catch (e) {
      return rejectWithValue('Не удалось обновить список');
    }
  }
);