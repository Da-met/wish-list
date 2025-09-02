import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, useEffect } from 'react';

import cls from './GiftsFromList.module.scss';
import { Text, TextSize } from '@/shared/ui/Text/Text';
import { GiftsFromListItem } from '../GiftsFromListItem/GiftsFromListItem';
import { useSelector } from 'react-redux';
import { getWishDetailsData } from '@/entities/Wish/model/selectors/wishDetails';
import { getGiftsFromSameList } from '../../model/selectors/getGiftsFromSameList';
import { StateSchema } from '@/app/providers/StoreProvider';
import { getRouteWishDetails } from '@/shared/const/router';
import { useNavigate } from 'react-router-dom';
import { fetchWishesByList } from '@/features/fetchWishesByListId';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchListById } from '@/entities/List';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';



interface GiftsFromListProps {
    className?: string;
    isLoading?: boolean;
}

const getSkeletons = new Array(9)
    .fill(0)
    .map((item, index) => (
        ''
    ));

export const GiftsFromList = memo((props: GiftsFromListProps) => {
    const { className, isLoading } = props;

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const currentWish = useSelector(getWishDetailsData);  
    const listFromStore = useSelector((state: StateSchema) =>
        currentWish?.list_id
            ? state.lists?.entities?.[currentWish.list_id] // зависит от структуры, может быть state.lists.data.find(...)
            : undefined
    );
    const giftsFromSame = useSelector((state: StateSchema) =>
        getGiftsFromSameList(state, currentWish?.list_id, currentWish?.id),
    );
    
    // Загружаем список, если его нет
    useEffect(() => {
        if (currentWish?.list_id && !listFromStore) {
            dispatch(fetchListById(currentWish.list_id));
        }
    }, [currentWish?.list_id, listFromStore, dispatch]);

    if (!giftsFromSame.length) return null;


    return (
        <div className={classNames(cls.GiftsFromList, {}, [className])}>
            <div className={cls.background}>
                {isLoading ? (
                    <div className={cls.wrapper}>
                        <Skeleton width={260} height={285} className={cls.card}/>
                        <Skeleton width={260} height={285} className={cls.card}/>
                    </div>
                    
                ) : (
                    <>
                        <Text title={'Другие подарки из списка'} size={TextSize.S} className={cls.text}/>
                        <div className={cls.wrapper}>
                            {giftsFromSame.map((wish) => (
                                <GiftsFromListItem
                                    key={wish.id}
                                    className={cls.card}
                                    wish={wish}              
                                    onClick={() => {
                                        navigate(getRouteWishDetails(String(wish.id)))
                                    }}
                                />
                            ))}
                        </div>
                    </>
                )}
                
            </div>
        </div>
    );
});


