import { classNames } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';
import cls from './FriendsList.module.scss';
import { FriendsListItem } from '../FriendsItem/FriendsListItem';
import { Friend } from '@/pages/FriendsPage/index';
import { Text, TextAlign, TextSize } from '@/shared/ui/Text/Text';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import { Loader } from '@/shared/ui/Loader/Loader';



interface FriendsListProps {
    className?: string;
    friendsList: Friend[];
    isLoading?: boolean;
    userId?: number;
}

// const getSkeletons = new Array(3)
//     .fill(0)
//     .map((item, index) => (
//         <Skeleton height={112} className={cls.card} key={index} />
//     ));

export const FriendsList = memo((props: FriendsListProps) => {
    const {
        className,
        friendsList,
        isLoading,
        userId,
    } = props;

    const renderWish = (friend: Friend) => (
        <FriendsListItem
            friend={friend}
            className={cls.card}
            key={friend.id}
            userId={userId}
        />
    );

    if(!isLoading && !friendsList.length) {
        return (
            <div className={classNames(cls.wrappNotFound, {}, [className])}>
                <div className={cls.notFound}>
                   <div className={cls.empty}>У вас пока нет друзей :(</div>
                </div>
            </div>
        )
    }
    console.log('FRIENDS  LIST', friendsList)
    return (
        <div className={classNames(cls.FriendsList, {}, [className])}>
            <div className={cls.wrapper}>
                {friendsList.length > 0
                    ? friendsList.map(renderWish)
                    : null
                }
                {/* {isLoading && getSkeletons} */}
                {isLoading && <Loader/>}

            </div>
            
        </div>
    );
});
