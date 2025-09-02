import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "@/app/providers/StoreProvider";
import { User, userActions } from "@/entities/User";
import { USER_LOCALSTORAGE_KEY } from "@/shared/const/localstorage";

interface loginByUsernameProps {
    username: string;
    email: string;
    password: string;
}

interface LoginResponse {
    user: User;
    accessToken: string;
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
            console.log('[LOGIN] Отправка на сервер:', authData);

            const response = await extra.api.post<LoginResponse>('/user/login', authData);
            console.log('[LOGIN] Отправка на сервер:', authData);
            if (!response.data) {
                throw new Error();
            }

            const { user, accessToken } = response.data;

            localStorage.setItem('token', accessToken);
            localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(user));

            console.log('[LOGIN] Сохранён accessToken:', accessToken);
            console.log('[LOGIN] Сохранён user:', user);    

            dispatch(userActions.setAuthData(user));
            return user;
        } catch (error) {
            console.log(error)
            return rejectWithValue('Некорректные данные 3');
        }
    }
)
