import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider";
import { ThunkExtraArg } from "app/providers/StoreProvider/config/StateSchema";
import axios, { AxiosInstance } from 'axios';
import { User, userActions } from "entities/User";
import { USER_LOCALSTORAGE_KEY } from "shared/const/localstorage";

interface loginByUsernameProps {
    username: string;
    email: string;
    password: string;
}

export const loginByUsername = createAsyncThunk<
    User, 
    loginByUsernameProps, 
    ThunkConfig<string>
>(
    'login/loginByUsername',
    async ( authData, ThunkApi ) => {
        const {
            extra,
            dispatch,
            rejectWithValue,
        } = ThunkApi;

        try {
            const response = await extra.api.post<User>('/user/login', authData);
            console.log(response)
            if (!response.data) {
                throw new Error();
            }
            localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data))
            dispatch(userActions.setAuthData(response.data));
            return response.data;
        } catch (error) {
            console.log(error)
            return rejectWithValue('Некорректные данные');
        }
    }
)
