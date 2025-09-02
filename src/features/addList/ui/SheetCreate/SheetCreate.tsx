import { classNames } from "@/shared/lib/classNames/classNames";
import cls from './SheetCreate.module.scss';
import { Modal } from "@/shared/ui/Modal/Modal";
import { SetStateAction, Suspense, useCallback, useState, Dispatch } from "react";

import { Loader } from "@/shared/ui/Loader/Loader";
import { Text, TextSize } from "@/shared/ui/Text/Text";
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
    const listName = useSelector(getAddListName)
    const listError = useSelector(getAddListError)
    const user = useSelector(getUserAuthData)
    const dispatch = useAppDispatch()

    const onChangeHandler = useCallback((value: string) => {
        dispatch(addListSliceActions.setName(value))
    }, [dispatch])


    const onSendList = useCallback(async() => { 
        if (user === undefined) return;
        await dispatch(sendList());
        setIsSheetCreateModal(false);
        await dispatch(fetchLists({ idUser: user.id }));

        // if (user?.id) {
        //     dispatch(fetchLists({ idUser: user.id }));
        // }

    }, [dispatch, user])


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
                        <Button 
                            className={cls.btn} 
                            theme={ButtonTheme.BACKGROUND}
                            onClick={onSendList}
                        >
                            Сохранить
                        </Button>
                    </div>
                                    
                </Suspense>
                
            </Modal>
        </DynamicModuleLoader>
    )
}

export default SheetCreate;