import { classNames } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';

import cls from './CompilationDetailsItem.module.scss';
import { Text, TextSize } from '@/shared/ui/Text/Text';

import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { AppImage } from '@/shared/ui/AppImage/AppImage';
import UserIcon from '@/shared/assets/icons/user-circle.svg'
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import { Avatar } from '@/shared/ui/Avatar';
import Cake from '@/shared/assets/icons/cake.svg';
import Delete from '@/shared/assets/icons/x.svg';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';


interface CompilationDetailsItemProps {
    className?: string;
    // wish: Wish;
}


export const CompilationDetailsItem = memo((props: CompilationDetailsItemProps) => {
    const { 
        className, 
        // wish 
    } = props;

    const navigate = useNavigate();
    // const onOpenWish = useCallback(() => {
    //     // navigate(RoutePath.wish_details + wish.id)
    //     navigate(getRouteWishDetails(String(wish.id)))
    // }, [])

    // const errorFallback = <UserIcon/>

    return (
        <div className={classNames(cls.CompilationDetailsItem, {}, [className])}>

            {/* <div className={cls.imgWrapper}> */}
                <div className={cls.wrapper}>
                    <div className={cls.text}>
                        <div >                         
                            <Text size={TextSize.L} title={'Сертификат в Золотое яблоко'} className={cls.name}/>
                            
                            <Text size={TextSize.S} title={'Цена: 5000₽'}/>
                            <Button theme={ButtonTheme.OUTLINE} className={cls.look}>Смотреть в магазине</Button>
                            <Text className={cls.description} text={'Новый год — новая косметика! В январе многие наши пользователи захотели пополнить свои запасы подарками из «Золотого яблока». Так что сертификат в самый крупный косметический магазин страны снова на коне!'}/>

                        </div>
                    </div>

                    <AppImage 
                        fallback={<Skeleton width={397} height={300}/>}
                        src={`https://thumbs.dreamstime.com/b/pop-art-hand-gift-box-vector-illustration-success-expression-idea-vintage-comic-cartoon-gesture-person-people-stylized-86482704.jpg`} 
                        className={cls.img}
                    />
                </div>
                
            {/* </div> */}
            
        </div>
    );
});
