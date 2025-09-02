import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "@/app/providers/StoreProvider";

import { getUserAuthData, User, userActions } from "@/entities/User";
import { List } from "@/entities/Sheets";
import { getAddListName } from "../selectors/addListSelectors";


export const sendList = createAsyncThunk<
    List,
    void, 
    // sendListProps, 
    ThunkConfig<string>
>(
    'addSheet/sendList',
    async ( authData, ThunkApi ) => {
        const { extra, rejectWithValue, getState } = ThunkApi;

        const userData = getUserAuthData(getState());
        const listName = getAddListName(getState());
   
        if (!userData || !listName) {
            return rejectWithValue('error')
        }

        try {
            const response = await extra.api.post<List>('/lists/add', {
                name: listName,
                user_id: userData.id,
            });

            return response.data;

        } catch (error) {
            console.log(error)
            return rejectWithValue('Некорректные данные');
        }
    }
)
