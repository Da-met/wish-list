import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';

import cls from './WishListItem.module.scss';
import { Wish } from '../../model/types/wish';
import { Text, TextAlign, TextSize } from 'shared/ui/Text/Text';
import { Button, ButtonSize } from 'shared/ui/Button/Button';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';


interface WishListItemProps {
    className?: string;
    wish: Wish;
}


export const WishListItem = memo((props: WishListItemProps) => {
    const { className, wish } = props;

    const navigate = useNavigate();
    const onOpenWish = useCallback(() => {
        navigate(RoutePath.wish_details + wish.id)
    }, [])



    return (
        <div className={classNames(cls.WishListItem, {}, [className])}>
            <div className={cls.imgWrapper}>
                <img src={`http://localhost:5000/${wish?.img}`} className={cls.img}/>
                <div className={cls.text}>
                    <div >
                        <Text text={dayjs(wish.createdAt).format(" HH:mm DD.MM.YYYY ")} size={TextSize.S} align={TextAlign.RIGHT} />
                        <Text title={wish.name} className={cls.name} size={TextSize.M}/>
                        <Text text={wish.description} className={cls.description}/>
                    </div>
                    <div  className={cls.bottom}>
                        <AppLink to={`${RoutePath.profile}${wish?.user_id}`} className={cls.user}>
                            <img src={wish?.user.img}/>
                            <Text text={wish?.user.name} />
                        </AppLink>
                        <Button onClick={onOpenWish} size={ButtonSize.XL} className={cls.btn} >
                                {'>'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
});
