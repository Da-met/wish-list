import { classNames } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';

import cls from './SheetList.module.scss';
import { SheetListItem } from '../SheetListItem/SheetListItem';
import { List } from '../../model/types/list';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import { useSelector } from 'react-redux';
import { getUserAuthData } from '@/entities/User';
import { getProfileData } from '@/features/editableProfileCard/model/selectors/getProfileData/getProfileData';



interface SheetListProps {
    className?: string;
    myLists: List[] ;
    isLoading?: boolean;
    ownerId?: number;
}

const getSkeletons = new Array(3)
    .fill(0)
    .map((item, index) => (
        <Skeleton height={112} className={cls.card} key={index} />
    ));


export const SheetList = memo((props: SheetListProps) => {
    const {
        className,
        isLoading,
        myLists,
        ownerId,
    } = props;

    const authData = useSelector(getUserAuthData);
    // const profileData = useSelector(getProfileData);

    const canEdit = authData?.id === ownerId;
    // console.log('authData?.id', authData?.id)
    // console.log(canEdit)


    const renderWish = (list: List) => (
        <SheetListItem
            list={list}
            className={cls.card}
            canEdit={canEdit}

        />
    );
    


    
    return (
        <div className={classNames(cls.SheetList, {}, [className])}>
            <div className={cls.wrapper}>
                {myLists.length > 0
                    ? myLists.map(renderWish)
                    : null
                }
                {isLoading && getSkeletons}
            </div>
        </div>
    );
});
