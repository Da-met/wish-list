

import { ThunkConfig } from '@/app/providers/StoreProvider';
import { List } from '@/entities/Sheets';
import { createAsyncThunk } from '@reduxjs/toolkit';


export const fetchListById = createAsyncThunk<List, number, ThunkConfig<string>>(
    'lists/fetchListById',
    async (listId, { extra, rejectWithValue }) => {
        try {
            const response = await extra.api.get<List>(`/lists/${listId}`);
            if (!response.data) {
                throw new Error();
            }
            return response.data;
        } catch (e) {
            return rejectWithValue('Не удалось загрузить список');
        }
    }
);