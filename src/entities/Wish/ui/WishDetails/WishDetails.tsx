import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, useCallback, useEffect } from 'react';
import cls from './WishDetails.module.scss';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { wishDetailsActions, wishDetailsReducer } from '@/entities/Wish/model/slice/wishDetailsSlice';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchWishById } from '@/entities/Wish/model/services/fetchWishById/fetchWishById';
import { useSelector } from 'react-redux';
import { getWishDetailsData, getWishDetailsError, getWishDetailsIsLoading } from '@/entities/Wish/model/selectors/wishDetails';
import { Text, TextAlign, TextSize } from '@/shared/ui/Text/Text';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { getRouteListDetails, getRouteProfile, getRouteWishEdit, getRouteWishes } from "@/shared/const/router";
import dayjs from 'dayjs';
import { getUserAuthData } from '@/entities/User';
import { getCanEditArticle } from '@/pages/WisheDetailsPage/model/selectors/wish';
import { useNavigate } from 'react-router-dom';
import { GiftsFromList } from '@/entities/GiftsFromList';
import { deleteWish } from '../../model/services/deleteWish/deleteWish';
import { reserveWish, unreserveWish } from '@/features/reservation/api/reservationApi';
import { unreserveWishThunk } from '@/features/unreserveWish/model/services/unreserveWishThunk';
import { fetchLists } from '@/entities/Sheets/model/services/fetchLists/fetchLists';
import { fetchWishesByList } from '@/features/fetchWishesByListId';
import { fetchListById, listDetailsReducer } from '@/entities/List';
import { setWishCompleted } from '../../model/services/setWishCompleted/setWishCompleted';
import CheckIcon from '@/shared/assets/icons/check.svg'
import CircleIcon from '@/shared/assets/icons/circle.svg'
import { SeoHead } from '@/shared/ui/SeoHead/SeoHead';
import { APP_NAME } from '@/shared/config/appName/appName';



interface WishDetailsProps {
    className?: string;
    id?: string;
}

const reducers: ReducersList = {
    wishDetails: wishDetailsReducer,
    listDetails: listDetailsReducer,
}

export const WishDetails = memo((props: WishDetailsProps) => {
    const { className, id } = props;
    const dispatch = useAppDispatch();
    const isLoading = useSelector(getWishDetailsIsLoading);

    const wish = useSelector(getWishDetailsData);
    const error = useSelector(getWishDetailsError);
    const canEdit = useSelector(getCanEditArticle);


    const user = useSelector(getUserAuthData)
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            dispatch(wishDetailsActions.clear()); 
            dispatch(fetchWishById(id)); // 👈 перезапрашиваешь новый подарок
        }
    }, [id, dispatch]); 

    useInitialEffect(() => {
        dispatch(fetchWishById(id))
    })
    
    useEffect(() => {
        if (wish?.list_id) {
            dispatch(fetchListById(wish.list_id));
        }
    }, [wish?.list_id, dispatch]);


    const onEditWish = useCallback(() => {
        if (id !== undefined) {
            navigate(getRouteWishEdit(id));
        }  
    }, [wish?.id, id, navigate])

    const onDeleteWish = useCallback(() => {
        if (!id) return;
        const confirmed = window.confirm('Вы действительно хотите удалить подарок?');
        if (confirmed) {
            dispatch(deleteWish(id)).then((result) => {
                if (deleteWish.fulfilled.match(result)) {
                    console.log('Удалено!');
                    navigate(getRouteWishes());
                    if (user) {
                        dispatch(fetchLists({ idUser: user.id }));
                    }
                } else {
                    console.error('Ошибка при удалении');
                }
            });
        }
    }, [wish?.id, id, navigate])
 
    let content; 

    const handleReserve = async () => {
        try {
            await reserveWish(Number(id));
            dispatch(fetchWishById(id)); // перезапрашиваем обновлённое состояние
        } catch (error) {
            console.error('Ошибка при резервировании', error);
            alert('Не удалось зарезервировать подарок');
        }
    };
    
    const handleUnreserve = async () => {
        try {
            await dispatch(unreserveWishThunk(Number(id))).unwrap();
            dispatch(fetchWishById(id));
        } catch (error) {
            console.error('Ошибка при снятии резервации', error);
            alert('Не удалось отменить резерв');
        }
    };

    
    const isReserved = Boolean(wish?.reservation);
    const isReservedByMe = wish?.reservation?.user_id === user?.id;

    const handleToggleCompleted = () => {
        if (!wish) return;
        dispatch(setWishCompleted({ id: wish.id, completed: !wish.completed }));
    };

    if(isLoading) {
        content = (
            <Skeleton width={890} height={500} />
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
            <div className={classNames(cls.wrapper, { [cls.completed]: wish?.completed, [cls.isReserved]: isReserved })}>
                <img 
                    src={wish?.img} 
                    className={cls.wishImg}
                />

                <div className={cls.wrapperInfo}>

                    <div className={cls.part_one}>
                        <div className={cls.top}>
                            <AppLink to={getRouteProfile(String(wish?.user_id))}>
                                <div className={cls.wrapperUser}>
                                    <img src={wish?.user.img} className={cls.userImg}/>
                                    <Text text={wish?.user.name} className={cls.userText} />
                                </div>
                            </AppLink>
                            <Text className={cls.time} text={dayjs(wish?.createdAt).format(" HH:mm DD.MM.YYYY ")} size={TextSize.S}/>
                        </div>
                        <Text title={wish?.name} size={TextSize.M} className={cls.wishName}/>
                        <Text text={wish?.description} className={cls.description}/>
                    </div>
                    
                    <div className={cls.part_two}>
                        <div className={cls.btnWrapper} >
                            {wish?.url ? (<Button 
                                className={cls.btn}
                                theme={ButtonTheme.OUTLINE}
                            >
                                <a href={wish?.url}>Ссылка</a>
                            </Button>) : '\u00A0'}

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

                            {isReserved ? (
                                isReservedByMe ? (
                                    <Button
                                        className={cls.btnReserve}
                                        onClick={handleUnreserve}
                                        theme={ButtonTheme.OUTLINE}
                                    >
                                        Отменить резервацию
                                    </Button>
                                ) : (
                                    <div
                                        className={cls.divReserve} 
                                    >
                                        Зарезервировано 
                                        {/* <CheckIcon/> */}
                                    </div>
                                )
                            ) : (
                                !canEdit ? (
                                    <Button 
                                        className={cls.btnReserve}
                                        onClick={handleReserve}
                                        theme={ButtonTheme.BACKGROUND}
                                    >
                                        Зарезервировать <CircleIcon/>
                                    </Button>) : ('\u00A0')
                                
                            )}

                            <AppLink to={getRouteListDetails(String(wish?.list_id))}>
                                <div className={cls.listName}>
                                    Список: {wish?.list?.name || 'Без названия'}
                                </div>
                            </AppLink>
                        </div>
                    </div>

                </div>
            </div>
        )
    }

    // SEO данные
    const title = `${wish?.name} — ${APP_NAME}`;
    const description = wish?.description || 'Смотрите подробности подарка и возможность его зарезервировать.';
    const url = `https://vishi.ru/wish/${wish?.id}`;
    const image = wish?.img || '/images/preview-wish.jpg';

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={true}>

            {/*  SEO */}
            <SeoHead title={title} description={description} url={url} image={image} />

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

                        <Button 
                            theme={ButtonTheme.OUTLINE} 
                            className={cls.editBtn}
                            onClick={onDeleteWish}>
                            УДАЛИТЬ
                        </Button> 

                        <Button onClick={handleToggleCompleted} theme={ButtonTheme.BACKGROUND} className={cls.editBtn}>
                            {wish?.completed ? 'Вернуть в активные' : 'Исполнено'}
                        </Button> 
                    </div>
                    )
                }
                <GiftsFromList isLoading={isLoading}/>
            </div>

        </DynamicModuleLoader>

    );
});


