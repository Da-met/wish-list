import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback, useEffect } from 'react';
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
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import dayjs from 'dayjs';
import { getUserAuthData } from 'entities/User';
import { getCanEditArticle } from 'pages/WisheDetailsPage/model/selectors/wish';
import { useNavigate } from 'react-router-dom';


interface WishDetailsProps {
    className?: string;
    id?: string;
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
    const canEdit = useSelector(getCanEditArticle);
    const navigate = useNavigate();

    useInitialEffect(() => {
        dispatch(fetchWishById(id))
    })

    

    const onEditWish = useCallback(() => {
        navigate(`${RoutePath.wish_details}${wish?.id}/edit`);
    }, [wish?.id, navigate])
 
    let content; 

    if(isLoading) {
        content = (
            <div className={cls.wrapper}>
                <Skeleton width={370} height={550} />
                <div className={cls.wrapperInfo}>
                    <div className={cls.wrapperUser}>
                        <Skeleton width={40} height={40} border="50%" className={cls.skeletonImg}/>
                        <Skeleton width={180} height={30} />
                    </div>
                    <Skeleton width={400} height={40}/>
                    <Skeleton width={440} height={65} className={cls.description}/>
                    <div className={cls.btnWrapper} >
                        <Skeleton width={460} height={44} className={cls.btn}/>
                        <Skeleton width={460} height={44} className={cls.btn}/>
                    </div>
                    <div className={cls.reserverWrapper}>
                        <Skeleton width={200} height={44} className={cls.btnReserv}/>
                        <Skeleton width={110} height={20} className={cls.time}/>
                    </div>
                </div>
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
                    <div className={cls.top}>
                        <AppLink to={`${RoutePath.profile}${wish?.user_id}`}>
                            <div className={cls.wrapperUser}>
                                <img src={wish?.user.img}/>
                                <Text text={wish?.user.name} />
                            </div>
                        </AppLink>
                        <Text className={cls.time} text={dayjs(wish?.createdAt).format(" HH:mm DD.MM.YYYY ")} size={TextSize.S}/>
                    </div>

                        
                    <Text title={wish?.name} size={TextSize.M}/>
                    <Text text={wish?.description} className={cls.description}/>
                    <div className={cls.btnWrapper} >
                        {wish?.url ? (<Button 
                            className={cls.btn}
                            theme={ButtonTheme.OUTLINE}
                        >
                            <a href={wish?.url}>Ссылка</a>
                        </Button>) : ''}
                        <Button 
                            className={cls.btn}
                            theme={ButtonTheme.OUTLINE}
                        >
                            <a href={`https://www.ozon.ru/search/?text=${wish?.name}`}>Найти на OZON</a>
                        </Button>
                        <Button 
                            className={cls.btn}
                            theme={ButtonTheme.OUTLINE}
                        >
                            <a href={`https://www.wildberries.ru/catalog/0/search.aspx?search=${wish?.name}`}>Найти на Wildberries</a>
                        </Button>
                    </div>
                    <div className={cls.reserverWrapper}>

                        <Button 
                            className={cls.btnReserv}
                            theme={ButtonTheme.BACKGROUND}
                        >
                            Зарезервировать
                        </Button>
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
                {canEdit && (
                    <div className={cls.bottomBtn}>
                        <Button  
                            theme={ButtonTheme.BACKGROUND_INVERTED} 
                            className={cls.editBtn}
                            onClick={onEditWish}
                        >
                            Редактировать
                        </Button> 
                        <Button theme={ButtonTheme.BACKGROUND} className={cls.editBtn}>
                            Исполнено
                        </Button> 
                    </div>

                    )
                }
                
            </div>
        </DynamicModuleLoader>

    );
});

