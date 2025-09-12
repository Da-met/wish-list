import { classNames } from "@/shared/lib/classNames/classNames";
import cls from './SheetCreate.module.scss';
import { Modal } from "@/shared/ui/Modal/Modal";
import { SetStateAction, Suspense, useCallback, useState, Dispatch, useEffect } from "react";

import { Loader } from "@/shared/ui/Loader/Loader";
import { Text, TextSize, TextTheme } from "@/shared/ui/Text/Text";
import { Input } from "@/shared/ui/Input/Input";
import { Button, ButtonTheme } from "@/shared/ui/Button/Button";
import { useSelector } from "react-redux";
import { getAddListError, getAddListName } from "../../model/selectors/addListSelectors";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { addListSliceActions, addListSliceReducer } from "../../model/slice/addSheetSlice";
import { DynamicModuleLoader, ReducersList } from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { sendList } from "../../model/services/sendList";

import { getUserAuthData } from "@/entities/User";
import { fetchLists } from "@/entities/Sheets/model/services/fetchLists/fetchLists";



export interface SheetCreateProps {
    className?: string;
    isOpen: boolean;
    onClose: () => void;
    setIsSheetCreateModal: Dispatch<SetStateAction<boolean>>;
}

const reducers: ReducersList = {
    addSheet: addListSliceReducer,
}


const SheetCreate = ({className, isOpen, onClose, setIsSheetCreateModal}: SheetCreateProps) => {
    const [isLoading, setIsLoading] = useState(false);

    const listName = useSelector(getAddListName)
    const listError = useSelector(getAddListError)
    const user = useSelector(getUserAuthData)
    const dispatch = useAppDispatch()

    console.log('SheetCreate render - isOpen:', isOpen, 'listName:', listName);

    const onChangeHandler = useCallback((value: string) => {
        dispatch(addListSliceActions.setName(value))
        // Очищаем ошибку при изменении поля
        dispatch(addListSliceActions.setError(''))
    }, [dispatch])


    const onSendList = useCallback(async() => { 
        if (isLoading) return; // Защита от двойного вызова
        console.log('🔄 Starting to send list...');
        setIsLoading(true);

        if (user === undefined) {
            dispatch(addListSliceActions.setError('Пользователь не авторизован'));
            setIsLoading(false);
            return;
        }
        
        if (!listName || listName.trim() === '') {
            dispatch(addListSliceActions.setError('Название листа не может быть пустым'));
            setIsLoading(false);
            return;
        }

        try {
            console.log('📤 Dispatching sendList...');
            const result = await dispatch(sendList());
            
            if (sendList.fulfilled.match(result)) {
                console.log('✅ List created successfully');
                setIsSheetCreateModal(false);
                
                // Очищаем поле после успешного создания
                dispatch(addListSliceActions.setName(''));
                dispatch(addListSliceActions.setError(''));
                
                console.log('🔄 Fetching updated lists...');
                await dispatch(fetchLists({ idUser: user.id }));
            } else {
                console.log('❌ Failed to create list:', result.error);
                dispatch(addListSliceActions.setError(result.payload as string || 'Ошибка при создании'));
            }
        } catch (error) {
            console.log('💥 Error in onSendList:', error);
            dispatch(addListSliceActions.setError('Неизвестная ошибка'));
        }
    }, [dispatch, user, listName, setIsSheetCreateModal])

    useEffect(() => {
        if (!isOpen) {
            // Очищаем состояние при закрытии модалки
            dispatch(addListSliceActions.setName(''));
            dispatch(addListSliceActions.setError(''));
        }
    }, [isOpen, dispatch])
    

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <Modal
                // className={classNames(cls.RegistrationModal, {}, [className])}
                isOpen={isOpen}
                onClose={onClose}
            >
                <Suspense fallback={<Loader/>}>
                    <div className={cls.wrapper}>
                        <Text title={'Новый лист'} size={TextSize.M} className={cls.text}/>
                        <Input 
                            placeholder="Название листа"
                            type="text" 
                            value={listName}
                            className={cls.inputName}
                            onChange={onChangeHandler}
                        />
                        {/* Показываем ошибку если есть */}
                        {listError && (
                            <Text 
                                text={listError} 
                                theme={TextTheme.ERROR} 
                                className={cls.errorText}
                            />
                        )}
                        <Button 
                            className={cls.btn} 
                            theme={ButtonTheme.BACKGROUND}
                            onClick={onSendList}
                            disabled={!listName || listName.trim() === '' || isLoading}
                        >
                            {/* Сохранить */}
                            {isLoading ? 'Создание...' : 'Сохранить'}
                        </Button>
                    </div>
                                    
                </Suspense>
                
            </Modal>
        </DynamicModuleLoader>
    )
}

export default SheetCreate;