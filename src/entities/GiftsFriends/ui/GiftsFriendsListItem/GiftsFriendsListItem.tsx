import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';

import cls from './GiftsFriendsListItem.module.scss';
import { Text, TextAlign, TextSize } from '@/shared/ui/Text/Text';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button/Button';
import { getRouteProfile, getRouteWishDetails } from "@/shared/const/router";
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { AppImage } from '@/shared/ui/AppImage/AppImage';
import UserIcon from '@/shared/assets/icons/user-circle.svg'
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import { Avatar } from '@/shared/ui/Avatar';
import Cake from '@/shared/assets/icons/cake.svg';
import Delete from '@/shared/assets/icons/x.svg';
import { Wish } from '@/entities/Wish';
import { unreserveWish } from '@/features/reservation/api/reservationApi';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchWishById } from '@/entities/Wish/model/services/fetchWishById/fetchWishById';
import { unreserveWishThunk } from '@/features/unreserveWish/model/services/unreserveWishThunk';

interface GiftsFriendsListItemProps {
    className?: string;
    wish: Wish;
}


export const GiftsFriendsListItem = memo((props: GiftsFriendsListItemProps) => {
    const { 
        className, 
        wish 
    } = props;
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const errorFallback = <UserIcon/>

    const onOpenWish = useCallback(() => {
        navigate(getRouteWishDetails(String(wish.id)))
    }, [])




    const handleUnreserve = async () => {
        console.log('RRRRRRRRRRR')
        try {
            await dispatch(unreserveWishThunk(wish.id)).unwrap();
        } catch (error) {
            console.error('Ошибка при снятии резервации', error);
            alert('Не удалось отменить резерв');
        }
    };




    return (
        <div className={classNames(cls.GiftsFriendsListItem, {}, [className])}>

            <div className={cls.imgWrapper}>
                <a className={cls.btn} onClick={onOpenWish}>
                    <AppImage 
                        fallback={<Skeleton width={397} height={300}/>}
                        src={wish.img} 
                        className={cls.img}
                    />
                    <div className={cls.text}>
                        <div >                         
                            <Text title={wish.name} className={cls.name} size={TextSize.M}/>
                            {/* <Text text={''} className={cls.description}/> */}
                        </div>
                        
                    </div>
                </a>
                

                <div  className={cls.bottom}>
                    <AppLink to={getRouteProfile(String(wish?.user_id))} className={cls.user}>
                    {/* <AppLink to={''} className={cls.user}> */}
                        <Avatar 
                            size={40} 
                            src={wish.user.img} 
                            className={cls.userAvatar}
                        />
                        <Text text={wish.user.name} className={cls.userName}/>
                    </AppLink>
                    <Text text={''} size={TextSize.S} align={TextAlign.RIGHT} />
                </div>

                <Button 
                    theme={ButtonTheme.BACKGROUND_INVERTED} 
                    className={cls.btnCancellation}
                    onClick={handleUnreserve}
                >
                    Отменить
                </Button>
            </div>
            
        </div>
    );
});
