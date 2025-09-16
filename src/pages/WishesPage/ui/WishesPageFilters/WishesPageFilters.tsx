import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, useCallback} from 'react';

import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import cls from './WishesPageFilters.module.scss';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import { Select } from '@/shared/ui/Select/Select';
import { WishesSortField, WishSortSelector } from '@/entities/Wish';
import { getWishesPageSort, getWishesPageSearch, getWishesPageOrder, getWishesPageScope, getWishesPageStatus } from '../../model/selectors/wishesPageSelectors';
import { ScopeFilter, SortOrder, StatusFilter } from '@/shared/types';
import { wishesPageActions } from '@/pages/WishesPage/model/slice/wishesPageSlice';
import { fetchWishesList } from '@/pages/WishesPage/model/services/fetchWishesList/fetchWishesList';
import { Input } from '@/shared/ui/Input/Input';
import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebounce';
import { getUserAuthData } from '@/entities/User';




interface WishesPageFiltersProps {
    className?: string;
}

export const WishesPageFilters = memo((props: WishesPageFiltersProps) => {
    const { className } = props;

    const dispatch = useAppDispatch();
    const sort = useSelector(getWishesPageSort);
    const order = useSelector(getWishesPageOrder);
    const search = useSelector(getWishesPageSearch);
    const scope = useSelector(getWishesPageScope);
    const status = useSelector(getWishesPageStatus);

    // проверка авторизации
    const authData = useSelector(getUserAuthData);
    const isAuth = Boolean(authData); 

    const fetchData = useCallback(() => {
        dispatch(fetchWishesList({ replace: true }));
    }, [dispatch]);

    const debouncedFetchData = useDebounce(fetchData, 500);

    const onChangeOrder = useCallback((newOrder: SortOrder) => {
        dispatch(wishesPageActions.setOrder(newOrder));
        dispatch(wishesPageActions.setPage(1));
        fetchData();
    }, [dispatch, fetchData ]);

    const onChangeSort = useCallback((newSort: WishesSortField) => {
        dispatch(wishesPageActions.setSort(newSort));
        dispatch(wishesPageActions.setPage(1));
        fetchData();
    }, [dispatch, fetchData ]);

    const onChangeSearch = useCallback((search: string) => {
        dispatch(wishesPageActions.setSearch(search));
        dispatch(wishesPageActions.setPage(1));
        debouncedFetchData();
    }, [ dispatch, debouncedFetchData ]);

    const handleFilterChange = useCallback((newFilter: ScopeFilter) => {
        dispatch(wishesPageActions.setScope(newFilter));
        dispatch(wishesPageActions.setPage(1));
        fetchData();
    }, [dispatch, fetchData ]);

    const onChangeStatus = useCallback((newStatus: StatusFilter) => {
        dispatch(wishesPageActions.setStatus(newStatus));
        dispatch(wishesPageActions.setPage(1));
        fetchData();
      }, [dispatch, fetchData]);

    return (
        <div className={classNames(cls.WishesPageFilters, {}, [className])}>
            <div className={cls.sortWrapper}>
                <WishSortSelector
                    order={order}
                    sort={sort}
                    status={status}
                    onChangeOrder={onChangeOrder}
                    onChangeSort={onChangeSort}
                    onChangeStatus={onChangeStatus}
                />
                
                {isAuth && (
                    <div className={cls.btn}>
                        <Button 
                            onClick={() => handleFilterChange('all')} 
                            theme={scope === 'all' ? ButtonTheme.BACKGROUND : ButtonTheme.CLEAR}
                        >Все</Button>

                        <Button 
                            onClick={() => handleFilterChange('subscriptions')}
                            theme={scope === 'subscriptions' ? ButtonTheme.BACKGROUND : ButtonTheme.CLEAR}
                        >Друзья</Button>
                    </div>
                )}
            </div>
            <div className={cls.search}>
                <svg className={cls.svg} xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                <Input
                    className={cls.search_input}
                    onChange={onChangeSearch}
                    value={search}
                    placeholder={''}
                />
            </div>
        </div>
    );
});



