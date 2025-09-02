import { createAsyncThunk } from '@reduxjs/toolkit';
import { Wish } from '@/entities/Wish';  // Импорт типа Wish
import { ThunkConfig } from '@/app/providers/StoreProvider';

interface FetchWishesByListArgs {
  listId: string;
}

export const fetchWishesByList = createAsyncThunk<
  Wish[],                 // что возвращаем в fulfilled
  FetchWishesByListArgs,  // аргументы (сюда передаем listId)
  ThunkConfig<string>     // конфиг для rejectWithValue
>(
  'wishesByList/fetchWishesByList',
  async ({ listId }, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI;

    try {
      // Запрос на сервер по эндпоинту, который отдаёт все подарки для listId
      const response = await extra.api.get<Wish[]>(`/wish/by-list/${listId}`);

      if (!response.data) {
        throw new Error('Подарки не найдены');
      }

      return response.data;
    } catch (error) {
      // При ошибке возвращаем reject с сообщением
      return rejectWithValue('Ошибка загрузки подарков списка');
    }
  }
);
