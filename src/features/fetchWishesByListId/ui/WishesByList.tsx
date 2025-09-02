

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWishesByList } from '../model/services/fetchWishesByList';


import cls from './WishesByList.module.scss';
import { WishListItem } from '@/entities/Wish/ui/WishListItem/WishListItem';
import { getWishesByListError, getWishesByListLoading, getWishesFromList } from '../model/selectors/wishesByListSelectors';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import CircleIcon from '@/shared/assets/icons/circle.svg'
import CheckIcon from '@/shared/assets/icons/check.svg'



interface WishesByListProps {
  listId: string;
  className?: string;
}

export const WishesByList = ({ listId, className }: WishesByListProps) => {
    const dispatch = useAppDispatch();
    const wishes = useSelector(getWishesFromList);
    const isLoading = useSelector(getWishesByListLoading);
    const error = useSelector(getWishesByListError);

    useEffect(() => {
        if (listId) {
        dispatch(fetchWishesByList({ listId }));
        }
    }, [listId, dispatch]);

    if (isLoading) return <div>Загрузка подарков...</div>;
    if (error) return <div>Ошибка: {error}</div>;
    if (!wishes.length) return <div>Подарков пока нет</div>;

    return (
        <div className={cls.WishesByList}>
        {wishes.map((wish) => (
            <div className={cls.wrap}>
                <WishListItem key={wish.id} wish={wish} />
                {wish?.completed && <div className={cls.pin}><CheckIcon/></div>}
                {!wish?.completed && wish?.isReserved && <div className={cls.pin}><CircleIcon/></div>}
            </div>
            
        ))}
        
        </div>
    );
};
