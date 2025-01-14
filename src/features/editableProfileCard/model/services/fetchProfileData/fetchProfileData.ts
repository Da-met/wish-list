import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider";
import { Profile } from "../../../../../entities/Profile/model/types/profile";
import { useSelector } from "react-redux";
import { getUserAuthData } from "entities/User";



export const fetchProfileData = createAsyncThunk<Profile, string, ThunkConfig<string>>(
    'profile/fetchProfileData',
    async ( id, thunkApi ) => {
        const { extra, rejectWithValue } = thunkApi;

        try {
            const response = await extra.api.get<Profile>(`/user/auth/${id}`);
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
