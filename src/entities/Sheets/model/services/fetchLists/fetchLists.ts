import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';

import { addQueryParams } from '@/shared/lib/url/addQueryParams/addQueryParams';
import { getUserAuthData, User } from '@/entities/User';
import { List } from '../../types/list';


interface fetchListsProps {
    // replace?: boolean;
    idUser: number
}

export const fetchLists = createAsyncThunk<
    List[],
    fetchListsProps,
    ThunkConfig<string>
    >(
        'lists/fetchLists',
        async (props, thunkApi) => {
            const {idUser} = props;
            const { extra, rejectWithValue, getState  } = thunkApi;
            const authData = getUserAuthData(getState());
            const id = authData?.id

            if (!id) {
                return rejectWithValue('Пользователь не авторизован');
            }


            try {
                addQueryParams({
                    // sort, order
                })
                const response = await extra.api.get<List[]>(`/lists/user/${idUser}`);

                if (!response.data) {
                    throw new Error();
                }
                return response.data;
            } catch (e) {
                return rejectWithValue('error');
            }
        },
    );


