import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, useCallback, useState } from 'react';
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
    const user = useSelector(getUserAuthData);
    
    const location = useLocation(); 
    const state = location.state as LocationState | undefined;
    const listId = state?.listId;
    
    const dispatch = useAppDispatch();
    const isLoading = useSelector(getWishDetailsIsLoading);
    const error = useSelector(getWishDetailsError);


    if (isEdit == true) {
        console.log(`IS EDIT IS EDIT`)
    }

    const navigate = useNavigate();

    useInitialEffect(() => {
        if (!isEdit && listId) {
            dispatch(addWishFormActions.setWishListId(Number(listId)));
        }
        if (isEdit && id) {
            dispatch(fetchWishById(id)).then((action) => {
                if (action.meta.requestStatus === 'fulfilled' && typeof action.payload === 'object' && action.payload !== null) {
                    const wish = action.payload as Wish;
                    dispatch(addWishFormActions.setWishName(wish.name));
                    dispatch(addWishFormActions.setWishDescription(wish.description));
                    dispatch(addWishFormActions.setWishImg(wish.img));
                    dispatch(addWishFormActions.setWishUrl(wish.url));
                    dispatch(addWishFormActions.setWishListId(wish.list_id));
                } else {
                    console.error('Не удалось загрузить данные подарка для редактирования');
                }
            });
        }
    })


    const listsUser = useSelector(getLists.selectAll)
    const transformedlistsUser = listsUser.map(item => ({
        value: String(item.id),
        content: item.name
    }));


    const wishName = useSelector(getAddWishNameState);
    const wishDescription = useSelector(getAddWishDescriptionState);
    const wishImg = useSelector(getAddWishImgState);
    const wishUrl = useSelector(getAddWishUrlState);
    const wishListId = useSelector(getAddWishListIdState);

    const onChangeWishName = useCallback((value: string) => {
        dispatch(addWishFormActions.setWishName(value))
    }, [dispatch]);
    const onChangeWishDescription = useCallback((value: string) => {
        dispatch(addWishFormActions.setWishDescription(value))
    }, [dispatch]);
    const onChangeWishImg = useCallback((value: string) => {
        dispatch(addWishFormActions.setWishImg(value))
    }, [dispatch]);
    const onChangeWishUrl = useCallback((value: string) => {
        dispatch(addWishFormActions.setWishUrl(value))
    }, [dispatch]);
    const onChangeWishListId = useCallback((value: any) => {
        dispatch(addWishFormActions.setWishListId(value))
    }, [dispatch]);

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const REQUIRED_MESSAGE = 'Это поле обязательно';
    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};
        if (!wishName?.trim()) newErrors.name = REQUIRED_MESSAGE;
        if (!wishDescription?.trim()) newErrors.description = REQUIRED_MESSAGE;
        if (!wishImg?.trim()) newErrors.img = REQUIRED_MESSAGE;
        if (!wishListId) newErrors.list = REQUIRED_MESSAGE;

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    
    const onSendWish = async () => {
        if (!validateForm()) return;

        if (!user) return;
        let formData = {
            name: wishName, 
            description: wishDescription, 
            img: wishImg, 
            url: wishUrl, 
            list_id: wishListId,
            user_id: user.id,
        }

        if (isEdit && id) {
            const result = await dispatch(updateWish({ id, data: formData }));
            if (updateWish.fulfilled.match(result)) {
                console.log('Подарок обновлён!');
                navigate(getRouteWishDetails(String(id)));
            } else {
                console.error('Ошибка при обновлении подарка');
            }
        } else {
            const result = await dispatch(addWish(formData));
            if (addWish.fulfilled.match(result)) {
                // console.log('Подарок создан!');
                if (wishListId) {
                    dispatch(fetchLists({ idUser: user.id }));
                }
            
                navigate(getRouteWishDetails(String(result.payload.id)));
            } else {
                console.error('Ошибка при создании подарка');
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
                />

                <div className={cls.wrapperInfo}>
                    
                    {noLists ? (
                        <Button
                            theme={ButtonTheme.OUTLINE}
                            onClick={() => navigate(getRouteList())}
                        >
                            Создать лист
                        </Button>
                    ) : (
                        <Select 
                            options={transformedlistsUser} 
                            label={'Выберете список'}
                            className={cls.list}
                            onChange={onChangeWishListId}
                            value={wishListId?.toString()}  
                        />
                    )}

                    <div className={cls.part_one}>
                        {errors.name && <span className={cls.error}>{errors.name}</span>}
                        <Input
                            placeholder='Название подарка'
                            className={cls.fields}
                            value={wishName}
                            onChange={onChangeWishName}
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
                    >Сохранить
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


