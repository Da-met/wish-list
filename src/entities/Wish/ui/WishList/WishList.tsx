import { classNames } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';

import cls from './WishList.module.scss';
import { Wish } from '../../model/types/wish';
import { WishListItem } from '../WishListItem/WishListItem';
import { WishListItemSkeleton } from '../WishListItem/WishListItemSkeleton';
import { Text, TextAlign, TextSize } from '@/shared/ui/Text/Text';
import { Loader } from '@/shared/ui/Loader/Loader';
import CircleIcon from '@/shared/assets/icons/circle.svg'
import CheckIcon from '@/shared/assets/icons/check.svg'
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';


interface WishListProps {
    className?: string;
    wishes: Wish[];
    isLoading?: boolean;
}


export const WishList = memo((props: WishListProps) => {
    const {
        className,
        wishes,
        isLoading,
    } = props;

    const renderWish = (wish: Wish) => (
        <div className={cls.wrap}>
            <WishListItem
                wish={wish}
                className={cls.card}
                key={wish.id}
            />
            {wish?.completed && <div className={cls.pin}><CheckIcon/></div>}
            {!wish?.completed && wish?.isReserved && <div className={cls.pin}><CircleIcon/></div>}
        </div>
       
    );

    if(!isLoading && !wishes.length) {
        return (
            <div className={classNames(cls.WishList, {}, [className])}>
                <div className={cls.notFound}>Не найдено</div>
            </div>
        )
    }


    return (
        <>
            {isLoading ? 
                <div className={cls.skeleton}>
                    <div className={cls.wrapperSceleton}>
                        <Skeleton className={cls.sceletonLi}/>
                        <Skeleton className={cls.sceletonLi}/>
                        <Skeleton className={cls.sceletonLi}/>
                    </div>
                </div> 
                : 
                <div className={classNames(cls.WishList, {}, [className])}>
                    <div className={cls.wrapper}>
                        {wishes.length > 0
                            ? wishes.map(renderWish)
                            : null
                        }
                    </div>
                </div> 
            }
        </>
    );
});
