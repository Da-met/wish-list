import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "@/app/providers/StoreProvider";

import { User, userActions } from "@/entities/User";
import { TOKEN_LOCALSTORAGE_KEY, USER_LOCALSTORAGE_KEY } from "@/shared/const/localstorage";

interface registrationProfileProps {
    username: string;
    email: string;
    password: string;
    img: string;
    birthday: string;
}

interface RegistrationResponse {
    token: string;
    user: User;
  }

export const registrationProfile = createAsyncThunk<
    User, 
    registrationProfileProps, 
    ThunkConfig<string>
>(
    'registration/registrationProfile',
    async ( authData, ThunkApi ) => {
        const {
            extra,
            dispatch,
            rejectWithValue,
        } = ThunkApi;
        
        try {
            const response = await extra.api.post<RegistrationResponse>(
                '/user/registration', 
                authData
            );
            const { token, user } = response.data;
            if (!token || !user) {
                throw new Error();
            }

            localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(user));
            localStorage.setItem(TOKEN_LOCALSTORAGE_KEY, token);
            
            dispatch(userActions.setAuthData(user));

            return user;
        } catch (error: any) {
            console.log(error)
            const message = error.response?.data?.message || 'Неизвестная ошибка';
            return rejectWithValue(message);
        }
    }
)
