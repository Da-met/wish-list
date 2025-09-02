import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "@/app/providers/StoreProvider";




export const deleteList = createAsyncThunk<
    void, // Успешное выполнение не возвращает данные
    { listId: number }, // Тип передаваемых данных
    ThunkConfig<string>
>(
    'deleteFriend',
    async ( { listId }, ThunkApi ) => {
        const { extra, rejectWithValue } = ThunkApi;
        const id = listId
        try {
            const response = await extra.api.delete(`/lists/${id}`);
            console.log(response)

            return response.data;
        } catch (error) {
            console.log(error)
            return rejectWithValue('Некорректные данные');
        }
    }
)