import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback} from 'react';

import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';

import cls from './WishesPageFilters.module.scss';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Select } from 'shared/ui/Select/Select';
import { WishesSortField, WishSortSelector } from 'entities/Wish';
import { getWishesPageSort, getWishesPageSearch, getWishesPageOrder, getWishesPageFilter } from '../../model/selectors/wishesPageSelectors';
import { SortFilter, SortOrder } from 'shared/types';
import { wishesPageActions } from 'pages/WishesPage/model/slice/wishesPageSlice';
import { fetchWishesList } from 'pages/WishesPage/model/services/fetchWishesList/fetchWishesList';
import { Input } from 'shared/ui/Input/Input';
import { useDebounce } from 'shared/lib/hooks/useDebounce/useDebounce';




interface WishesPageFiltersProps {
    className?: string;
}

export const WishesPageFilters = memo((props: WishesPageFiltersProps) => {
    const { className } = props;

    const dispatch = useAppDispatch();
    const sort = useSelector(getWishesPageSort);
    const order = useSelector(getWishesPageOrder);
    const search = useSelector(getWishesPageSearch);
    const filter = useSelector(getWishesPageFilter);
    // const type = useSelector(getWishesPageType);

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

    const handleFilterChange = useCallback((newFilter: SortFilter) => {
        dispatch(wishesPageActions.setFilter(newFilter));
        dispatch(wishesPageActions.setPage(1));
        fetchData();
    }, [dispatch, fetchData ]);

    return (
        <div className={classNames(cls.WishesPageFilters, {}, [className])}>
            <div className={cls.sortWrapper}>
                <WishSortSelector
                    order={order}
                    sort={sort}
                    onChangeOrder={onChangeOrder}
                    onChangeSort={onChangeSort}
                />
                <div className={cls.btn}>
                    <Button 
                        onClick={() => handleFilterChange('all')} 
                        theme={filter === 'all' ? ButtonTheme.BACKGROUND : ButtonTheme.CLEAR}
                    >Все</Button>

                    <Button 
                        onClick={() => handleFilterChange('subscriptions')}
                        theme={filter === 'subscriptions' ? ButtonTheme.BACKGROUND : ButtonTheme.CLEAR}
                    >Подписки</Button>
                </div>
            
            </div>
            <div className={cls.search}>
                    <Input
                        onChange={onChangeSearch}
                        value={search}
                        placeholder={'Поиск '}
                    />
            </div>
        </div>
    );
});



