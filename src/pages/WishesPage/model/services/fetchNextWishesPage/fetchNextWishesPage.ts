import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import {
    getWishesPageHasMore,
    getWishesPageIsLoading,
    getWishesPageNum,
} from '../../selectors/wishesPageSelectors';
import { wishesPageActions } from '../../slice/wishesPageSlice';
import { fetchWishesList } from '../fetchWishesList/fetchWishesList';


export const fetchNextWishesPage = createAsyncThunk<
    void,
    void,
    ThunkConfig<string>
    >(
        'wishesPage/fetchNextWishesPage',
        async (_, thunkApi) => {
            const { getState, dispatch } = thunkApi;
            const hasMore = getWishesPageHasMore(getState());
            const page = getWishesPageNum(getState());
            const isLoading = getWishesPageIsLoading(getState());

            if (hasMore && !isLoading) {
                dispatch(wishesPageActions.setPage(page + 1));
                dispatch(fetchWishesList({}));
            }
        },
    );
