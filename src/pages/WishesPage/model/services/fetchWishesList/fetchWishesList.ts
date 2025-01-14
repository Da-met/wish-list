import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';

import { Wish } from 'entities/Wish';
import { getWishesPageFilter, getWishesPageLimit, getWishesPageNum, getWishesPageOrder, getWishesPageSearch, getWishesPageSort } from '../../selectors/wishesPageSelectors';
import { useSelector } from 'react-redux';
import { addQueryParams } from 'shared/lib/url/addQueryParams/addQueryParams';
import { getUserAuthData } from 'entities/User';

interface FetchWishesListProps {
    replace?: boolean;
}

export const fetchWishesList = createAsyncThunk<
    Wish[],
    FetchWishesListProps,
    ThunkConfig<string>
    >(
        'wishesPage/fetchWishesList',
        async (props, thunkApi) => {
            const { extra, rejectWithValue, getState } = thunkApi;
            // const {page = 1} = props;
            const limit = getWishesPageLimit(getState());
            
            const sort = getWishesPageSort(getState());
            const order = getWishesPageOrder(getState());
            const search = getWishesPageSearch(getState());
            const page = getWishesPageNum(getState());
            const filter = getWishesPageFilter(getState());
            const user = getUserAuthData(getState());
            // console.log(user)
            try {
                addQueryParams({
                    sort, order
                })
                const response = await extra.api.get<Wish[]>('/wish', {
                    params: {
                        limit,
                        page,
                        sort,
                        order,
                        q: search,
                        filter,
                        u: user?.id
                    },
                });

                if (!response.data) {
                    throw new Error();
                }

                return response.data;
            } catch (e) {
                return rejectWithValue('error');
            }
        },
    );
