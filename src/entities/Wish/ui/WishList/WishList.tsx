import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';

import cls from './WishList.module.scss';
import { Wish } from '../../model/types/wish';
import { WishListItem } from '../WishListItem/WishListItem';
import { WishListItemSkeleton } from '../WishListItem/WishListItemSkeleton';
import { Text, TextAlign, TextSize } from 'shared/ui/Text/Text';


interface WishListProps {
    className?: string;
    wishes: Wish[];
    isLoading?: boolean;
}

const getSkeletons = new Array(9)
    .fill(0)
    .map((item, index) => (
        <WishListItemSkeleton className={cls.card} key={index} />
    ));

export const WishList = memo((props: WishListProps) => {
    const {
        className,
        wishes,
        isLoading,
    } = props;


    const renderWish = (wish: Wish) => (
        <WishListItem
            wish={wish}
            className={cls.card}
            key={wish.id}
        />
    );

    if(!isLoading && !wishes.length) {
        return (
            <div className={classNames(cls.WishList, {}, [className])}>
                <Text title={'Не найдено'} size={TextSize.M}/>
            </div>
        )
    }

    return (
        <div className={classNames(cls.WishList, {}, [className])}>
            <div className={cls.wrapper}>
                {wishes.length > 0
                    ? wishes.map(renderWish)
                    : null
                }
                {isLoading && getSkeletons}
            </div>
            
        </div>
    );
});
