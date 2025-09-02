import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "@/app/providers/StoreProvider";




export const deleteFriend = createAsyncThunk<
    void, // Успешное выполнение не возвращает данные
    { userId: number; subscriptionId: number }, // Тип передаваемых данных
    ThunkConfig<string>
>(
    'deleteFriend',
    async ( { userId, subscriptionId }, ThunkApi ) => {
        const { extra, rejectWithValue } = ThunkApi;

        try {
            const response = await extra.api.delete(`/subscription/delete/${userId}/${subscriptionId}`);
            console.log(response)

            return response.data;
        } catch (error) {
            console.log(error)
            return rejectWithValue('Некорректные данные');
        }
    }
)