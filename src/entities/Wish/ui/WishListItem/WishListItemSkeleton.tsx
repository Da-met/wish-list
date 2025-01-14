import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';

import cls from './WishListItem.module.scss';
import { Wish } from '../../model/types/wish';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { Button, ButtonSize } from 'shared/ui/Button/Button';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import { useNavigate } from 'react-router-dom';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';


interface WishListItemSkeletonProps {
    className?: string;
}


export const WishListItemSkeleton = memo((props: WishListItemSkeletonProps) => {
    const { className } = props;



    return (
        <div className={classNames(cls.WishListItemSkeleton, {}, [className])}>
            <div className={cls.imgWrapper}>
                <Skeleton width={600} height={200}/>
            </div>
        </div>
    );
});
