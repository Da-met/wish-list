import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, useCallback, useMemo } from 'react';
import { Select, SelectOption } from '@/shared/ui/Select/Select';

import { SortOrder, StatusFilter } from '@/shared/types';
import cls from './WishSortSelector.module.scss';
import { WishesSortField } from '../../model/consts/wishConsts';
import { ListBox } from '@/shared/ui/Popups/components/ListBox/ListBox';

interface WishSortSelectorProps {
    className?: string;
    sort: WishesSortField;
    order: SortOrder;
    status: StatusFilter; 
    onChangeOrder: (newOrder: SortOrder) => void;
    onChangeSort: (newSort: WishesSortField) => void;
    onChangeStatus: (s: StatusFilter) => void; 
}

export const WishSortSelector = memo((props: WishSortSelectorProps) => {
    const {
        className, onChangeOrder, onChangeSort, order, sort, status, onChangeStatus
    } = props;

    const orderOptions = useMemo<SelectOption<SortOrder>[]>(() => [
        { value: 'asc', content: 'возрастанию' },
        { value: 'desc', content: 'убыванию' },
    ], []);

    const sortFieldOptions = useMemo<SelectOption<WishesSortField>[]>(() => [
        { value: WishesSortField.CREATED, content: 'дате' },
        { value: WishesSortField.TITLE, content: 'названию' },
    ], []);

    const statusOptions = useMemo<SelectOption<StatusFilter>[]>(() => [
        { value: 'active', content: 'активные' },
        { value: 'all', content: 'все' },

    ], []);

    
    // wishesPageActions
    const changeSortHandler = useCallback((newSort: string) => {
        onChangeSort(newSort as WishesSortField);
    }, [onChangeSort]);

    const changeOrderHandler = useCallback((newOrder: string) => {
        onChangeOrder(newOrder as SortOrder);
    }, [onChangeOrder]);

    const changeStatusHandler = useCallback((val: string) => {
        onChangeStatus(val as StatusFilter);
      }, [onChangeStatus]);

    // console.log(sort, order)

    return (
        <div className={classNames(cls.WishSortSelector, {}, [className])}>
            <div className={cls.sortBy}>Сортировать по</div>

            <Select<WishesSortField>
                options={sortFieldOptions}
                // label={'Сортировать по'}
                value={sort}
                onChange={changeSortHandler}
                className={cls.order}
            />

            <Select
                options={orderOptions}
                label={''}
                value={order}
                onChange={changeOrderHandler}
                className={cls.order}
            />

            <Select<StatusFilter>
                options={statusOptions}
                label={''}
                value={status}
                onChange={changeStatusHandler}
                className={cls.order}
            />
        </div>
    );
});
