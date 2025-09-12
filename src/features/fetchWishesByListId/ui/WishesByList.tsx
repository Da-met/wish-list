

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWishesByList } from '../model/services/fetchWishesByList';


import cls from './WishesByList.module.scss';
import { WishListItem } from '@/entities/Wish/ui/WishListItem/WishListItem';
import { getWishesByListError, getWishesByListLoading, getWishesFromList } from '../model/selectors/wishesByListSelectors';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import CircleIcon from '@/shared/assets/icons/circle.svg'
import CheckIcon from '@/shared/assets/icons/check.svg'
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import { Wish } from '@/entities/Wish';



interface WishesByListProps {
  listId: string;
  className?: string;
}

export const WishesByList = ({ listId, className }: WishesByListProps) => {
    const dispatch = useAppDispatch();
    const wishes = useSelector(getWishesFromList);
    const isLoading = useSelector(getWishesByListLoading);
    // const isLoading = true;
    const error = useSelector(getWishesByListError);

    useEffect(() => {
        if (listId) {
        dispatch(fetchWishesByList({ listId }));
        }
    }, [listId, dispatch]);

    // if (isLoading) return <div className={cls.empty}>Загрузка подарков...</div>;
    if (error) return <div className={cls.empty}>Ошибка: {error}</div>;
    if (!wishes.length) return <div className={cls.empty}>Подарков пока нет</div>;


    const renderWish = (wish: Wish) => (
        <div className={cls.wrap}>
            <WishListItem
                wish={wish}
                className={cls.card}
                key={wish.id}
            />
            {wish?.completed && <div className={cls.pin}><CheckIcon/></div>}
            {!wish?.completed && wish?.isReserved && <div className={cls.pin}><CircleIcon/></div>}
        </div>
    );



    return (
        
            <>
            {isLoading ? 
                <div className={cls.skeleton}>
                    <div className={cls.wrapperSceleton}>
                        <Skeleton className={cls.sceletonLi}/>
                        <Skeleton className={cls.sceletonLi}/>
                        <Skeleton className={cls.sceletonLi}/>
                    </div>
                </div> 
                : 
                <div className={cls.WishesByList}>
                    <div className={cls.WishList}>
                        <div className={cls.wrapper}>
                            {wishes.length > 0
                                ? wishes.map(renderWish)
                                : null
                            }
                        </div>
                    </div>
                </div> 
            }
            {/* {wishes.map((wish) => (
                <div className={cls.wrap}>
                    <WishListItem key={wish.id} wish={wish} />
                    {wish?.completed && <div className={cls.pin}><CheckIcon/></div>}
                    {!wish?.completed && wish?.isReserved && <div className={cls.pin}><CircleIcon/></div>}
                </div>
            ))} */}
            </>
        
    );
};
