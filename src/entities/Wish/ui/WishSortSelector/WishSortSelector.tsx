import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback, useMemo } from 'react';
import { Select, SelectOption } from 'shared/ui/Select/Select';

import { SortOrder } from 'shared/types';
import cls from './WishSortSelector.module.scss';
import { WishesSortField } from '../../model/consts/wishConsts';
import { ListBox } from 'shared/ui/ListBox/ListBox';

interface WishSortSelectorProps {
    className?: string;
    sort: WishesSortField;
    order: SortOrder;
    onChangeOrder: (newOrder: SortOrder) => void;
    onChangeSort: (newSort: WishesSortField) => void;
}

export const WishSortSelector = memo((props: WishSortSelectorProps) => {
    const {
        className, onChangeOrder, onChangeSort, order, sort,
    } = props;

    const orderOptions = useMemo<SelectOption[]>(() => [
        {
            value: 'asc',
            content: 'возрастанию',
        },
        {
            value: 'desc',
            content: 'убыванию',
        },
    ], []);

    const sortFieldOptions = useMemo<SelectOption[]>(() => [
        {
            value: WishesSortField.CREATED,
            content: 'дате создания',
        },
        {
            value: WishesSortField.TITLE,
            content: 'названию',
        },

    ], []);

    const changeSortHandler = useCallback((newSort: string) => {
        onChangeSort(newSort as WishesSortField);
    }, [onChangeSort]);

    const changeOrderHandler = useCallback((newOrder: string) => {
        onChangeOrder(newOrder as SortOrder);
    }, [onChangeOrder]);

    // console.log(sort, order)

    return (
        <div className={classNames(cls.WishSortSelector, {}, [className])}>
            {/* <ListBox 
                onChange={changeSortHandler}
                value={sort}
                items={sortFieldOptions}
                label={'Сортировать по'}
            />

            <ListBox 
                onChange={changeOrderHandler}
                value={order}
                items={orderOptions}
                label={'по'}
            /> */}

            <Select
                options={sortFieldOptions}
                label={'Сортировать по'}
                value={sort}
                onChange={changeSortHandler}
            />

            <Select
                options={orderOptions}
                label={'по'}
                value={order}
                onChange={changeOrderHandler}
                className={cls.order}
            />
        </div>
    );
});
