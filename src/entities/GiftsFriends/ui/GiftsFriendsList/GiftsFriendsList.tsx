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


interface GiftsFriendsListProps {
    className?: string;
    // wishes: Wish[];
    // isLoading?: boolean;
}

const getSkeletons = new Array(9)
    .fill(0)
    .map((item, index) => (
        // <WishListItemSkeleton className={cls.card} key={index} />
        ''
    ));

    


export const GiftsFriendsList = memo((props: GiftsFriendsListProps) => {
    const {
        className,
    } = props;

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

    return (

        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <div className={cls.GiftsFriendsList}>
                {isLoading && <div>Загрузка...</div>}
                {error && <div className={cls.err}>{error}</div>}
                {!isLoading && !error && wishes.length === 0 && (
                    <div>Пока ничего не зарезервировано</div>
                )}
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
