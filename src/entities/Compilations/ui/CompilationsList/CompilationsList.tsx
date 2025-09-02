import { classNames } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';

import cls from './CompilationsList.module.scss';
import { CompilationsListItem } from '../CompilationsListItem/CompilationsListItem';
// import { GiftsFriendsListItem } from '../GiftsFriendsListItem/GiftsFriendsListItem';

// import { Wish } from '../../model/types/wish';
// import { WishListItem } from '../WishListItem/WishListItem';
// import { WishListItemSkeleton } from '../WishListItem/WishListItemSkeleton';
// import { Text, TextAlign, TextSize } from '@/shared/ui/Text/Text';


let friends = [
    {}
]


interface CompilationsListProps {
    className?: string;
    // wishes: Wish[];
    isLoading?: boolean;
}

const getSkeletons = new Array(9)
    .fill(0)
    .map((item, index) => (
        // <WishListItemSkeleton className={cls.card} key={index} />
        ''
    ));

export const CompilationsList = memo((props: CompilationsListProps) => {
    const {
        className,
        // wishes,
        isLoading,
    } = props;


    // const renderWish = (wish: Wish) => (
    //     <WishListItem
    //         wish={wish}
    //         className={cls.card}
    //         key={wish.id}
    //     />
    // );

    // if(!isLoading && !wishes.length) {
    //     return (
    //         <div className={classNames(cls.WishList, {}, [className])}>
    //             <Text title={'Не найдено'} size={TextSize.M}/>
    //         </div>
    //     )
    // }

    return (
        <div className={classNames(cls.CompilationsList, {}, [className])}>
            <div className={cls.wrapper}>
                {/* {friends.length > 0
                    ? friends.map(renderWish)
                    : null
                }
                {isLoading && getSkeletons} */}

                {/* <GiftsFriendsListItem className={cls.card}/> */}

                <CompilationsListItem className={cls.card}/>
                <CompilationsListItem className={cls.card}/>
                <CompilationsListItem className={cls.card}/>
                <CompilationsListItem className={cls.card}/>
                <CompilationsListItem className={cls.card}/>
                <CompilationsListItem className={cls.card}/>
                <CompilationsListItem className={cls.card}/>

            </div>
            
        </div>
    );
});
