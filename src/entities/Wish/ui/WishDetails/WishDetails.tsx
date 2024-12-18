import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useEffect } from 'react';
import cls from './WishDetails.module.scss';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { wishDetailsReducer } from 'entities/Wish/model/slice/wishDetailsSlice';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchWishById } from 'entities/Wish/model/services/fetchWishById/fetchWishById';
import { useSelector } from 'react-redux';
import { getWishDetailsData, getWishDetailsError, getWishDetailsIsLoading } from 'entities/Wish/model/selectors/wishDetails';
import { Text, TextAlign, TextSize } from 'shared/ui/Text/Text';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';


interface WishDetailsProps {
    className?: string;
    id: string;
}

const reducers: ReducersList = {
    wishDetails: wishDetailsReducer,
}

export const WishDetails = memo((props: WishDetailsProps) => {
    const { className, id } = props;
    const dispatch = useAppDispatch();
    const isLoading = useSelector(getWishDetailsIsLoading);
    const wish = useSelector(getWishDetailsData);
    const error = useSelector(getWishDetailsError);


    useEffect(() => {
        dispatch(fetchWishById(id))
    }, [dispatch, id])

    let content;

    if(isLoading) {
        content = (
            <div>
                <Skeleton className={cls.title} width={300} height={32} />
            </div>
        )
    } else if(error) {
        content = (
            <Text 
                align={TextAlign.CENTER}
                title={'Произошла ошибка при заргузке желания'}
            />
        )
    } else {
        content = (
            <div className={cls.wrapper}>
                <img src={`http://localhost:5000/${wish?.img}`} className={cls.wishImg}/>
                <div className={cls.wrapperInfo}>
                    <div className={cls.wrapperUser}>
                        <img />
                        <Text text='Name user' />
                    </div>
                    <Text title={wish?.name} size={TextSize.M}/>
                    <Text text={wish?.description} className={cls.description}/>
                    <div className={cls.btnWrapper} >
                        <Button 
                            className={cls.btn}
                            theme={ButtonTheme.OUTLINE}
                        >
                            <a href={wish?.url}>Ссылка</a>
                        </Button>
                        <Button 
                            className={cls.btn}
                            theme={ButtonTheme.OUTLINE}
                        >
                            Найти на OZON
                        </Button>
                    </div>
                    <div className={cls.reserverWrapper}>
                        <Button 
                            className={cls.btnReserv}
                            theme={ButtonTheme.OUTLINE_INVERTED}
                        >
                            Зарезервировать
                        </Button>
                        <Text className={cls.time} text={wish?.createdAt} size={TextSize.S}/>
                    </div>
                </div>
            </div>
        )
    }



    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={true}>
            <div className={classNames(cls.WishDetails, {}, [className])}>
                <div className={cls.glass}>
                    {content}
                </div>
            </div>
        </DynamicModuleLoader>

    );
});

