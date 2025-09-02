import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';

import cls from './WishListItem.module.scss';
import { Wish } from '../../model/types/wish';
import { Text, TextAlign, TextSize } from '@/shared/ui/Text/Text';
import { Button, ButtonSize } from '@/shared/ui/Button/Button';
import { getRouteProfile, getRouteWishDetails } from "@/shared/const/router";
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { AppImage } from '@/shared/ui/AppImage/AppImage';
import UserIcon from '@/shared/assets/icons/user-circle.svg'
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import { Avatar } from '@/shared/ui/Avatar';

import ImgIcon from '@/shared/assets/icons/image.svg';




interface WishListItemProps {
    className?: string;
    wish: Wish;
}


export const WishListItem = memo((props: WishListItemProps) => {
    const { className, wish } = props;
    const navigate = useNavigate();
    const onOpenWish = useCallback(() => {
        navigate(getRouteWishDetails(String(wish.id)))
    }, [])

    const errorFallback = <UserIcon/>

    return (
        <div className={classNames(cls.WishListItem, {
            [cls.completed]: wish?.completed, [cls.isReserved]: wish?.isReserved
        }, [className])}>
            <div className={cls.imgWrapper}>
                <a onClick={onOpenWish}  className={cls.btn}>
                    <AppImage 
                        fallback={<ImgIcon className={cls.imgIcon}/>}
                        src={wish.img} 
                        className={cls.img}
                    />
                    <div className={cls.ramka}></div>
                    
                    <div className={cls.text}>
                        <div >
                            <Text title={wish.name} className={cls.name} />
                            <Text text={wish.description || '\u00A0'} className={cls.description}/>
                        </div>
                        
                    </div>
                </a>
                

                <div  className={cls.bottom}>
                    <AppLink to={getRouteProfile(String(wish?.user_id))} className={cls.user}>
                        <Avatar size={40} src={wish?.user.img}/>
                        <Text className={cls.userName}  text={wish?.user.name} />
                    </AppLink>

                </div>
            </div>
        </div>
    );
});
