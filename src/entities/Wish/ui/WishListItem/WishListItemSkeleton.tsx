import { classNames } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';

import cls from './WishListItem.module.scss';

import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';


interface WishListItemSkeletonProps {
    className?: string;
}


export const WishListItemSkeleton = memo((props: WishListItemSkeletonProps) => {
    const { className } = props;



    return (
        <div className={classNames(cls.WishListItemSkeleton, {}, [className])}>
            <div className={cls.imgWrapper}>
                <Skeleton width={300} height={453}/>
            </div>
        </div>
    );
});
