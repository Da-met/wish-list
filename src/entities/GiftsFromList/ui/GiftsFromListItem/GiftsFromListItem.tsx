import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';

import cls from './GiftsFromListItem.module.scss';
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


interface GiftsFromListItemProps {
    className?: string;
    wish:  { id: number; name: string; img: string };
    onClick?: () => void;
}


export const GiftsFromListItem = memo((props: GiftsFromListItemProps) => {
    const { 
        className, 
        wish,
        onClick
    } = props;


    const navigate = useNavigate();
    const errorFallback = <UserIcon/>

    return (
        <div className={classNames(cls.GiftsFriendsListItem, {}, [className])}>

            <div className={cls.imgWrapper} onClick={onClick}>
                <div className={cls.btn}>
                    <AppImage 
                        fallback={<Skeleton width={397} height={300}/>}
                        src={wish.img} 
                        className={cls.img}
                    />
                    <div className={cls.text}>
                        <div >                         
                            <Text title={wish.name} className={cls.name} size={TextSize.S}/>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    );
});
