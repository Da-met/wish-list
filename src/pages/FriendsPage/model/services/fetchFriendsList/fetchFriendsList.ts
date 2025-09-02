import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';

import { Wish } from '@/entities/Wish';
// import { 
//     getWishesPageFilter, 
//     getWishesPageLimit, 
//     getWishesPageNum, 
//     getWishesPageOrder, 
//     getWishesPageSearch, 
//     getWishesPageSort } from '../../selectors/wishesPageSelectors';
import { useSelector } from 'react-redux';
import { addQueryParams } from '@/shared/lib/url/addQueryParams/addQueryParams';
import { getUserAuthData, User } from '@/entities/User';
import { Friend } from '../../types/friend';

interface fetchFriendsListProps {
    // replace?: boolean;
    idUser: number
}

export const fetchFriendsList = createAsyncThunk<
    Friend[],
    fetchFriendsListProps,
    ThunkConfig<string>
    >(
        'friends/fetchFriendsList',
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
                const response = await extra.api.get<Friend[]>(`/subscription/${idUser}`);

                if (!response.data) {
                    throw new Error();
                }
                // console.log(response.data)
                return response.data;
            } catch (e) {
                return rejectWithValue('error');
            }
        },
    );


