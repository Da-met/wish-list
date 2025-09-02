import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserSchema } from '../types/user'
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';


const initialState: UserSchema = { _inited: false };

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuthData: (state, action: PayloadAction<User>) => {
            state.authData = action.payload;
        },
        initAuthData: (state) => {
            try {
                const user = localStorage.getItem(USER_LOCALSTORAGE_KEY);
                if (user) {
                    state.authData = JSON.parse(user);
                }
            } catch (e) {
                console.error('❌ Ошибка при чтении user из localStorage:', e);
                localStorage.removeItem(USER_LOCALSTORAGE_KEY); // удаляем битые данные
            }
        
            state._inited = true;
        },

        logout: (state) => {
            state.authData = undefined;
            localStorage.removeItem(USER_LOCALSTORAGE_KEY);
        },
    },
});

// Action creators are generated for each case reducer function
export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;