import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';

import cls from './FriendsListItem.module.scss';
import { Text, TextAlign, TextSize } from '@/shared/ui/Text/Text';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button/Button';
import { getRouteProfile } from "@/shared/const/router";
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { AppImage } from '@/shared/ui/AppImage/AppImage';
import UserIcon from '@/shared/assets/icons/user-circle.svg'
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import { Avatar } from '@/shared/ui/Avatar';
import Cake from '@/shared/assets/icons/cake.svg';
import Delete from '@/shared/assets/icons/x.svg';
import { Friend } from '@/pages/FriendsPage';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { deleteFriend } from '@/pages/FriendsPage/model/services/deleteFriend/deleteFriend';
import { fetchFriendsList } from '@/pages/FriendsPage/model/services/fetchFriendsList/fetchFriendsList';
import { formatBirthday } from '@/shared/lib/formatBirthday/formatBirthday';


interface FriendsListItemProps {
    className?: string;
    friend: Friend;
    userId?: number;
}


export const FriendsListItem = memo((props: FriendsListItemProps) => {
    const { 
        className, 
        friend, 
        userId,
    } = props;
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const errorFallback = <UserIcon/>

    const deleteFriendBtn = useCallback(async() => {
        if (friend.id === undefined || userId  === undefined) return;

        const confirmed = window.confirm('Вы действительно хотите удалить друга?');
        if (confirmed) {
            await dispatch(deleteFriend({ userId, subscriptionId: Number(friend.id) })),
            await dispatch(fetchFriendsList({ idUser: Number(userId) }))
        }
        
    }, [dispatch, friend, userId]);


    const onOpenFriend = useCallback(() => {
        navigate(getRouteProfile(String(friend.id)))
    }, [])

    return (
        <div className={classNames(cls.FriendsListItem, {}, [className])}>
            <div>
                <div className={cls.wrapper} >
                    <AppImage 
                        fallback={<Skeleton width={397} height={300}/>}
                        src={friend.img} 
                        className={cls.img}
                    /> 
                    <div className={cls.wrapper_2}>
                        <div className={cls.date}>
                            <a onClick={onOpenFriend} className={cls.link}><Text className={cls.name} title={friend.name}/></a>
                            <div className={cls.birthday}>
                                <Cake className={cls.cake}/>
                                <div className={cls.birthdayData}>
                                    {formatBirthday(friend.birthday)}
                                </div>
                            </div>
                        </div>
                        <Button 
                            className={cls.delete} 
                            theme={ButtonTheme.CLEAR}
                            onClick={deleteFriendBtn}
                        >
                            <Delete />
                        </Button>
                    </div>
                    
                </div>
            </div>
        </div>
    );
});
