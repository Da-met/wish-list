import { ThunkConfig } from "@/app/providers/StoreProvider";
import { Wish } from "@/entities/Wish";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


interface wishAddProps {
    name?: string;
    description?: string;
    img?: string;
    url?: string;
    is_reserved?: boolean;
    user_id?: number;
    list_id?: number;
}


export const addWish = createAsyncThunk<
    Wish,
    wishAddProps,
    // void, 
    ThunkConfig<string>
>(
    'wish/addWish',
    async ( newWish , ThunkApi ) => {
        console.log(newWish)
        const { extra, rejectWithValue, getState } = ThunkApi;
        
        try {
            const response = await extra.api.post<Wish>( '/wish', newWish );  
            return response.data;

        } catch (error) {
            return rejectWithValue('Ошибка при добавлении подарка');
        }
    }
)


interface UpdateWishProps {
    id: string;
    name?: string;
    description?: string;
    img?: string;
    url?: string;
    is_reserved?: boolean;
    user_id?: number;
    list_id?: number;
}

export const updateWish = createAsyncThunk<
    Wish,
    UpdateWishProps,
    ThunkConfig<string>
>(
    'wish/updateWish',
    async ({ id, ...data }, ThunkApi) => {
        const { extra, rejectWithValue } = ThunkApi;

        try {
            const response = await extra.api.put<Wish>(`/wish/${id}`, data);
            return response.data;
        } catch (error) {
            return rejectWithValue('Ошибка при обновлении подарка');
        }
    }
);