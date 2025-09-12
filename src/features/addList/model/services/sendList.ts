import { createAsyncThunk } from "@reduxjs/toolkit";
import { StateSchema, ThunkConfig } from "@/app/providers/StoreProvider";

import { getUserAuthData, User, userActions } from "@/entities/User";
import { List } from "@/entities/Sheets";
import { getAddListName } from "../selectors/addListSelectors";


export const sendList = createAsyncThunk<
    List,
    void, 
    ThunkConfig<string>
>(
    'addSheet/sendList',
    async ( authData, ThunkApi ) => {
        const { extra, rejectWithValue, getState } = ThunkApi;
        // ПРАВИЛЬНЫЙ СПОСОБ получить состояние
        const state = getState() as StateSchema;
        const userData = getUserAuthData(getState());
        const listName = getAddListName(getState());

        console.log('📝 Creating list with state:', { 
            userData, 
            listName,
            fullState: state.addSheet 
        });
   
        if (!userData) {
            console.log('❌ No user data');
            return rejectWithValue('Пользователь не авторизован');
        }
        if (!listName || listName.trim() === '') {
            console.log('❌ No list name');
            return rejectWithValue('Название листа не может быть пустым');
        }

        try {
            const response = await extra.api.post<List>('/lists/add', {
                name: listName,
                user_id: userData.id,
            });

            console.log('✅ List created:', response.data);
            return response.data;
        } catch (error) {
            console.log('💥 Error creating list:', error);
            return rejectWithValue('Ошибка при создании листа');
        }
    }
)
