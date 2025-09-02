import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, useCallback, useState } from 'react';

import cls from './SheetListItem.module.scss';
import { Text, TextSize } from '@/shared/ui/Text/Text';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';

import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { AppImage } from '@/shared/ui/AppImage/AppImage';

import UserIcon from '@/shared/assets/icons/user-circle.svg'
import Delete from '@/shared/assets/icons/x.svg';
import Edit from '@/shared/assets/icons/edit-3.svg';
import CircleIcon from '@/shared/assets/icons/circle.svg'
import CheckIcon from '@/shared/assets/icons/check.svg'

import { List, ListWishes } from '../../model/types/list';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { getUserAuthData } from '@/entities/User';
import { deleteList } from '../../model/services/deleteList/deleteList';
import { fetchLists } from '../../model/services/fetchLists/fetchLists';
import { getRouteListDetails, getRouteWishCreate, getRouteWishDetails } from '@/shared/const/router';
import { updateList } from '../../model/services/updeteList/updateList';
import { Input } from '@/shared/ui/Input/Input';



interface SheetListItemProps {
    className?: string;
    list: List;
    canEdit: boolean;

}




export const SheetListItem = memo((props: SheetListItemProps) => {
    const { 
        className, 
        list, 
        canEdit,
    } = props;

    // if (!list) {
    //     return <div className={className}>Список не найден</div>;
    // }

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const authData = useSelector(getUserAuthData);

    const [editMode, setEditMode] = useState(false);
    const [localName, setLocalName] = useState(list.name);


    const onListIcon = useCallback((list: ListWishes) => {
        navigate(getRouteWishDetails(String(list.id)));
    }, [dispatch]);

    const renderListWish = (list: ListWishes ) => (
        <div className={cls.wrap}>
            <AppImage
                src={list.img} 
                className={classNames(cls.img, {
                    [cls.completed]: list?.completed, [cls.isReserved]: list?.isReserved 
                })}
                onClick={() => onListIcon(list)}
            /> 
            {list?.completed && <div className={cls.pin}><CheckIcon/></div>}
            {!list?.completed && list?.isReserved && <div className={cls.pin}><CircleIcon/></div>}
        </div>
    );

    const errorFallback = <UserIcon/>

    /** --- DELETE --- */
    const deleteListBtn = useCallback(async() => {
        const confirmed = window.confirm('Вы действительно хотите удалить лист?');
        if (list.id === undefined || authData  === undefined) return;
        await dispatch(deleteList({listId : list.id}))
        await dispatch(fetchLists({ idUser: Number(authData.id) }))
    }, [dispatch]);

    /** --- UPDATE --- */
    const saveEdit = useCallback(async () => {
        if (!localName.trim()) return;
        const res = await dispatch(updateList({ id: list.id, name: localName.trim() }));
        if (updateList.fulfilled.match(res)) setEditMode(false);
    }, [dispatch, list.id, localName]);

    const addNewList = useCallback(async() => {
        navigate(getRouteWishCreate(), { state: { listId: list.id } });
    }, [list.id, navigate])

    const giftsCount = Array.isArray(list.wishes) ? list.wishes.length : 0;
    // console.log('SheetListItem list:', list);

    return (
        <div className={classNames(cls.SheetListItem, {}, [className])}>
            <div className={cls.wrapper} >
                <a className={cls.link}>
                    <div className={cls.text}>
                        {editMode ? (
                            <>
                                <Input
                                    value={localName}
                                    onChange={setLocalName}
                                    className={cls.inputRename}
                                />
                                <Button onClick={saveEdit}>Сохранить</Button>
                                <Button theme={ButtonTheme.CLEAR} onClick={() => setEditMode(false)}>
                                    Отмена
                                </Button>
                            </>
                        ) : (
                            <div className={cls.header}>
                                <AppLink to={getRouteListDetails(String(list.id))}>
                                    <Text title={list.name} className={cls.name} size={TextSize.M}/>
                                </AppLink>
                                
                                <Text 
                                    text={`Подарков: ${giftsCount}`} 
                                    className={cls.description}
                                />
                            </div>
                        )}
                            {canEdit && (
                            <div  className={cls.btn}>
                                <Button 
                                    theme={ButtonTheme.CLEAR}
                                    onClick={() => setEditMode(true)}
                                >
                                    <Edit />
                                </Button>
                                <Button 
                                    className={cls.btnDelete}
                                    theme={ButtonTheme.CLEAR}
                                    onClick={deleteListBtn}
                                >
                                    <Delete/>
                                </Button>
                            </div> 
                        )}
                    </div>
                    
                    <div className={cls.wrapper_img}>
                        {canEdit && (
                            <div className={cls.img}>
                                <button 
                                    className={cls.btn_empty}
                                    onClick={addNewList}
                                >+</button>
                            </div>
                        )}
                        
                        {list.wishes.length > 0
                            ? list.wishes.map(renderListWish)
                            : ''
                        } 
                    </div>

                </a>
            </div>
            
        </div>
    );
});
