import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, useEffect } from 'react';

import cls from './GiftsFriendsList.module.scss';
import { GiftsFriendsListItem } from '../GiftsFriendsListItem/GiftsFriendsListItem';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { StateSchema } from '@/app/providers/StoreProvider';
import { fetchReservedWishes } from '@/features/fetchReservedWishes/model/services/fetchReservedWishes';
import { Page } from '@/widgets/Page/Page';
import { getReservedWishes, reservedWishesReducer } from '@/features/fetchReservedWishes/model/slice/reservedWishesSlice';
import { getReservedWishesError, getReservedWishesLoading } from '@/features/fetchReservedWishes/model/selectors/reservedWishesSelectors';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';


interface GiftsFriendsListProps {
    className?: string;
    // wishes: Wish[];
    // isLoading?: boolean;
}

 

export const GiftsFriendsList = memo((props: GiftsFriendsListProps) => {
    const { className } = props;
    const dispatch = useAppDispatch();
    const wishes = useSelector(getReservedWishes);
    const isLoading = useSelector(getReservedWishesLoading);
    const error = useSelector(getReservedWishesError);

    useEffect(() => {
        dispatch(fetchReservedWishes());
    }, [dispatch]);

    const reducers: ReducersList = {
        reservedWishes: reservedWishesReducer,
    };
    const SKELETONS = Array(3).fill(0).map((_, index) => (
        <Skeleton key={index} className={cls.sceletonLi}/>
    ));

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            {isLoading && 
                <div className={cls.skeleton}>
                    <div className={cls.wrapper}>
                        <div className={cls.wrapperSceleton}>
                            {SKELETONS}
                        </div>
                    </div>
                </div>
            }
            {error && 
                <div className={cls.empty}>
                    <div className={cls.err}>{error}</div>
                </div>
            }
            {!isLoading && !error && wishes.length === 0 && (
                <div className={cls.empty}>
                    <div>Пока ничего не зарезервировано</div>
                </div>
            )}
 
            <div className={cls.GiftsFriendsList}>
                {!isLoading && !error && wishes.length > 0 && (
                    wishes.map((wish) => (
                        <GiftsFriendsListItem key={wish.id} wish={wish} />
                    ))
                )}
                {/* {wishes.map((wish) => (
                    <GiftsFriendsListItem key={wish.id} wish={wish} />
                ))} */}
            </div>
        </DynamicModuleLoader>
    );
});
