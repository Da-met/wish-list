import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';

import { getWishesPageInited } from '../../selectors/wishesPageSelectors';
import { wishesPageActions } from '../../slice/wishesPageSlice';
import { fetchWishesList } from '../fetchWishesList/fetchWishesList';
import { SortOrder } from '@/shared/types';
import { WishesSortField } from '@/entities/Wish';



export const initWishesPage = createAsyncThunk<
    void,
    URLSearchParams,
    ThunkConfig<string>
    >(
        'wishesPage/initWishesPage',
        async (searchParams, thunkApi) => {
            const { getState, dispatch } = thunkApi;
            const inited = getWishesPageInited(getState());

            if (!inited) {
                const orderFromUrl = searchParams.get('order') as SortOrder;
                const sortFromUrl = searchParams.get('sort') as WishesSortField;

                if (orderFromUrl) {
                    dispatch(wishesPageActions.setOrder(orderFromUrl));
                }
                if (sortFromUrl) {
                    dispatch(wishesPageActions.setSort(sortFromUrl));
                }
                
                dispatch(wishesPageActions.initState())
                dispatch(fetchWishesList({}));
            }
        },
    );


