import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { $api } from '@/shared/api/api';
import { fetchReservedWishes } from '@/features/fetchReservedWishes';


export const unreserveWishThunk = createAsyncThunk<
    void,               // что возвращает (ничего)
    number,             // аргумент — это wishId
    ThunkConfig<string> // конфиг с типом ошибки
>(
    'reservedWishes/unreserveWish',
    async (wishId, thunkAPI) => {
        const { rejectWithValue, dispatch } = thunkAPI;

        try {
            // 1. Отправляем запрос на отмену резервации
            await $api.post('/reservation/unreserve', { wishId });

            // 2. Перезапрашиваем список после отмены
            dispatch(fetchReservedWishes());
        } catch (error) {
            console.error('Ошибка при отмене резервации', error);
            return rejectWithValue('Ошибка при отмене резервации');
        }
    }
);
