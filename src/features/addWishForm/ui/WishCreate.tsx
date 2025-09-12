import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import cls from './WishCreate.module.scss';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchWishById } from '@/entities/Wish/model/services/fetchWishById/fetchWishById';
import { useSelector } from 'react-redux';
import { getWishDetailsError, getWishDetailsIsLoading } from '@/entities/Wish/model/selectors/wishDetails';
import { Text, TextAlign } from '@/shared/ui/Text/Text';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';

import { useLocation, useNavigate } from 'react-router-dom';
import { Input } from '@/shared/ui/Input/Input';
import { InputImg } from '@/shared/ui/InputImg/InputImg';
import { Select } from '@/shared/ui/Select/Select';
import { addWishFormActions, addWishFormReducer } from '@/features/addWishForm/model/slices/addWishFormSlice';
import { getAddWishDescriptionState, getAddWishImgState, getAddWishListIdState, getAddWishNameState, getAddWishUrlState } from '@/features/addWishForm/model/selectors/getAddWishState/getAddWishState';
import { getLists } from '@/entities/Sheets/model/slice/listSlice';
import { addWish } from '@/features/addWishForm/model/services/addWish';
import { getUserAuthData } from '@/entities/User';
import { Wish } from '../../../entities/Wish/model/types/wish';
import { updateWish } from '../model/services/updateWish';
import { getRouteList, getRouteWishDetails } from '@/shared/const/router';
import { fetchWishesByList } from '@/features/fetchWishesByListId';
import { fetchLists } from '@/entities/Sheets/model/services/fetchLists/fetchLists';
import { StateSchema } from '@/app/providers/StoreProvider';
import { useWishValidation } from '@/shared/lib/hooks/useWishValidation/useWishValidation';




interface WishCreateProps {
    className?: string;
    id?: string;
    isEdit?: boolean;
}

interface LocationState {
    listId?: string;
}

const reducers: ReducersList = {
    addWishForm: addWishFormReducer,
}

export const WishCreate = memo((props: WishCreateProps) => {
    const { className, id, isEdit } = props;
    const navigate = useNavigate();
    const location = useLocation(); 
    const dispatch = useAppDispatch();

    const state = location.state as LocationState | undefined;
    const listId = state?.listId;

    const debugGetAddWishListIdState = (state: StateSchema) => {
        const listId = state.addWishForm?.list_id;
        return listId;
    };

    const { 
        wishName, 
        wishDescription, 
        wishImg, 
        wishUrl, 
        wishListId,
        isLoading,
        error,
        user,
        listsUser
    } = useSelector((state: StateSchema) => ({
        // Данные формы
        wishName: getAddWishNameState(state),
        wishDescription: getAddWishDescriptionState(state),
        wishImg: getAddWishImgState(state),
        wishUrl: getAddWishUrlState(state),
        wishListId: debugGetAddWishListIdState(state),
        
        // Статус и пользователь
        isLoading: getWishDetailsIsLoading(state),
        error: getWishDetailsError(state),
        user: getUserAuthData(state),
        
        // Списки пользователя
        listsUser: getLists.selectAll(state),
    }));

    const [highlightCreateList, setHighlightCreateList] = useState(false);

    const {
        errors,
        touched,
        validateField,
        validateForm,
        markFieldAsTouched,
        clearError,
    } = useWishValidation();

    useEffect(() => {
        if (listsUser.length > 0 && highlightCreateList) {
            setHighlightCreateList(false);
        }
    }, [listsUser.length, highlightCreateList]);

    useEffect(() => {
        // Через 5 секунд подсветка сама сбрасывается
        if (highlightCreateList) {
            const timer = setTimeout(() => {
                setHighlightCreateList(false);
            }, 5000);
            
            return () => clearTimeout(timer);
        }
    }, [highlightCreateList]);

    const transformedlistsUser = useMemo(() => 
        listsUser.map(item => ({
            value: String(item.id),
            content: item.name
        })),
        [listsUser]
    );



    useInitialEffect(() => {
        if (!isEdit && listId) {
            // Создание с указанием листа
            dispatch(addWishFormActions.setWishListId(Number(listId)));
        } else if (!isEdit && !listId && listsUser.length > 0) {
            // Создание без указания листа (автовыбор)
            dispatch(addWishFormActions.setWishListId(listsUser[0]?.id));
        } else if (isEdit && id) {
            // Редактирование (полная загрузка данных)
            dispatch(fetchWishById(id)).then((action) => {
                if (action.meta.requestStatus === 'fulfilled') {
                    const wish = action.payload as Wish;
                    dispatch(addWishFormActions.setWishName(wish.name));
                    dispatch(addWishFormActions.setWishDescription(wish.description));
                    dispatch(addWishFormActions.setWishImg(wish.img));
                    dispatch(addWishFormActions.setWishUrl(wish.url));
                    dispatch(addWishFormActions.setWishListId(wish.list_id));
                }
            });
        }
    });


    const onChangeWishName = useCallback((value: string) => {
        dispatch(addWishFormActions.setWishName(value));
        validateField('name', value);
        if (value.trim()) clearError('name');
    }, [dispatch, validateField, clearError]);

    const onChangeWishDescription = useCallback((value: string) => {
        dispatch(addWishFormActions.setWishDescription(value));
    }, [dispatch]);

    const onChangeWishImg = useCallback((value: string) => {
        dispatch(addWishFormActions.setWishImg(value));
        validateField('img', value); // ← ДОБАВИЛИ
        if (value.trim()) clearError('img'); // ← ДОБАВИЛИ
    }, [dispatch, validateField, clearError]);

    const onChangeWishUrl = useCallback((value: string) => {
        dispatch(addWishFormActions.setWishUrl(value));
    }, [dispatch]);


    const onChangeWishListId = useCallback((value: any) => {
        const numericValue = Number(value);
        dispatch(addWishFormActions.setWishListId(numericValue));
        validateField('list', numericValue); 

        if (numericValue > 0) {
            clearError('list');
        } 
    }, [dispatch, validateField, clearError]);

    

    const onSendWish = async () => {
        // Помечаем все обязательные поля как "тронутые"
        markFieldAsTouched('name');
        markFieldAsTouched('list');
        markFieldAsTouched('img');

        if (noLists) {
            setHighlightCreateList(true); // ← ВКЛЮЧАЕМ ПОДСВЕТКУ
            
            // Валидируем остальные поля тоже
            const formErrors = validateForm({
                name: wishName,
                list: undefined, // нет списка
                img: wishImg,
            });
            
            // Устанавливаем ошибки (если есть)
            if (Object.keys(formErrors).length > 0) {
                // Можно показать ошибки для других полей
                console.log('Ошибки при отсутствии списков:', formErrors);
            }
            
            return;
        }

        // Валидируем всю форму
        const isValid = validateForm({
            name: wishName,
            list: wishListId,
            img: wishImg,
        });

        if (!isValid || !user) return;

        const formData = {
            name: wishName, 
            description: wishDescription, 
            img: wishImg, 
            url: wishUrl, 
            list_id: wishListId,
            user_id: user.id,
        };

        if (isEdit && id) {
            const result = await dispatch(updateWish({ id, data: formData }));
            if (updateWish.fulfilled.match(result)) {
                navigate(getRouteWishDetails(String(id)));
            }
        } else {
            const result = await dispatch(addWish(formData));
            if (addWish.fulfilled.match(result)) {
                if (wishListId) {
                    dispatch(fetchLists({ idUser: user.id }));
                }
                navigate(getRouteWishDetails(String(result.payload.id)));
            }
        }
    };



 
    let content; 
    const noLists = listsUser.length === 0;

    if(isLoading) {
        content = (
            <div className={cls.wrapper}>
                <Skeleton width={390} height={550} />
            </div>
        )
    } else if(error) {
        content = (
            <Text 
                align={TextAlign.CENTER}
                title={'Произошла ошибка'}
            />
        )
    } else {
        content = (
            <div className={cls.wrapper}>
                <InputImg 
                    className={cls.wishImg}
                    value={wishImg}
                    onChange={onChangeWishImg}
                    onFocus={() => markFieldAsTouched('img')}
                    hasError={!!(touched.img && errors.img)} 
                    errorMessage={errors.img}
                />


                <div className={cls.wrapperInfo}>
                    {noLists ? (
                        <div className={cls.noListsContainer}>
                            <Button
                                className={classNames(cls.btnAddNewList, {
                                    [cls.highlight]: highlightCreateList // ← ПОДСВЕТКА
                                })}
                                theme={ButtonTheme.OUTLINE}
                                onClick={() => navigate(getRouteList())}
                                onFocus={() => setHighlightCreateList(false)} // ← СБРАСЫВАЕМ ПРИ ФОКУСЕ
                            >
                                Создать лист
                            </Button>
                            
                            {/* Простое сообщение */}
                            {highlightCreateList && (
                                <span className={cls.hintText}>
                                    Сначала нужно создать список
                                </span>
                            )}
                        </div>
                    ) : (
                        <Select 
                            options={transformedlistsUser} 
                            label={'Выберете список'}
                            className={cls.list}
                            onChange={onChangeWishListId}
                            value={wishListId?.toString()}
                            onFocus={() => markFieldAsTouched('list')} // ← ДОБАВИЛИ
                            hasError={!!(touched.list && errors.list)} // ← ДОБАВИЛИ  
                        />
                    )}

                    <div className={cls.part_one}>
                        {/* ДОБАВИЛИ ОШИБКУ ДЛЯ НАЗВАНИЯ */}
                        {touched.name && errors.name && (
                            <span className={cls.errorText}>{errors.name}</span>
                        )}
                        <Input
                            placeholder='Название подарка'
                            className={cls.fields}
                            value={wishName}
                            onChange={onChangeWishName}
                            onFocus={() => markFieldAsTouched('name')} // ← ДОБАВИЛИ
                            hasError={!!(touched.name && errors.name)} // ← ДОБАВИЛИ
                        />
                        <Input
                            placeholder='Описание'
                            className={cls.fields}
                            value={wishDescription}
                            onChange={onChangeWishDescription}
                        />
                        <Input
                            placeholder='Ссылка'
                            className={cls.fields}
                            value={wishUrl}
                            onChange={onChangeWishUrl}
                        />
                    </div>

                    <Button 
                        className={cls.btnAdd}
                        theme={ButtonTheme.BACKGROUND}
                        onClick={onSendWish}
                    >
                        Сохранить
                    </Button>
                </div>
            </div>
        )
    }



    return (
        <DynamicModuleLoader 
            reducers={reducers} 
            removeAfterUnmount={true}
        >
            <div className={classNames(cls.WishDetails, {}, [className])}>
                <div className={cls.glass}>
                    {content}
                </div>
            </div>

        </DynamicModuleLoader>

    );
});


