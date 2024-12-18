import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider";
import { useSelector } from "react-redux";
import { getUserAuthData } from "entities/User";
import { Wish } from "../../types/wish";



export const fetchWishById = createAsyncThunk<Wish, string, ThunkConfig<string>>(
    'wishDetails/fetchWishById',
    async ( id, thunkApi ) => {
        const { extra, rejectWithValue } = thunkApi;

        try {
            const response = await extra.api.get<Wish>(`/wish/${id}`);
            if(!response.data) {
                throw new Error();
            }
            return response.data;
        } catch (error) {
            console.log(error)
            return rejectWithValue('Некорректные данные');
        }
    }
)
