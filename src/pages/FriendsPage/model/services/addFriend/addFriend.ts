import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "@/app/providers/StoreProvider";



export const addFriend = createAsyncThunk<

    void, // Успешное выполнение не возвращает данные
    { userId: number; subscriptionId: number }, // Тип передаваемых данных
    ThunkConfig<string>
>(
    'addFriend',
    async ( authData, ThunkApi ) => {
        const { extra, rejectWithValue } = ThunkApi;

        try {
            const response = await extra.api.post('/subscription/add', authData);
            console.log(response)

            return response.data;
        } catch (error) {
            console.log(error)
            return rejectWithValue('Некорректные данные');
        }
    }
)
