import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Wish } from '@/entities/Wish';
import { createAsyncThunk } from '@reduxjs/toolkit';



interface updateWishProps {
    id: string;
    data: {
        // id?: string;
        name?: string;
        description?: string;
        img?: string;
        url?: string;
        // is_reserved?: boolean;
        user_id?: number;
        list_id?: number;
    };
}

export const updateWish = createAsyncThunk<
    Wish,
    updateWishProps,
    ThunkConfig<string>
>(
    'wish/updateWish',
    async ({ id, data }, { extra, rejectWithValue }) => {
        // const { extra, rejectWithValue } = ThunkApi;

        try {
            const response = await extra.api.put<Wish>(`/wish/${id}`, data);
            return response.data;
        } catch (e) {
            console.error('Ошибка при обновлении подарка', e);
            return rejectWithValue('Ошибка при обновлении подарка');
        }
    }
);