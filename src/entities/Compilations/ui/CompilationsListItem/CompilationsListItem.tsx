import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';

import cls from './CompilationsListItem.module.scss';
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


interface CompilationsListItemProps {
    className?: string;
    // wish: Wish;
}


export const CompilationsListItem = memo((props: CompilationsListItemProps) => {
    const { 
        className, 
        // wish 
    } = props;

    const navigate = useNavigate();
    // const onOpenWish = useCallback(() => {
    //     // navigate(RoutePath.wish_details + wish.id)
    //     navigate(getRouteWishDetails(String(wish.id)))
    // }, [])

    const errorFallback = <UserIcon/>

    return (
        <div className={classNames(cls.CompilationsListItem, {}, [className])}>

            <div className={cls.imgWrapper}>
                <a className={cls.btn}>
                    <AppImage 
                        fallback={<Skeleton width={397} height={300}/>}
                        src={`https://thumbs.dreamstime.com/b/pop-art-hand-gift-box-vector-illustration-success-expression-idea-vintage-comic-cartoon-gesture-person-people-stylized-86482704.jpg`} 
                        className={cls.img}
                    />
                    <div className={cls.text}>
                        <div >                         
                            <Text title={'Подборка 1 '} className={cls.name} size={TextSize.M}/>
                            {/* <Text text={''} className={cls.description}/> */}
                        </div>
                        
                    </div>
                </a>
                
            </div>
            
        </div>
    );
});
