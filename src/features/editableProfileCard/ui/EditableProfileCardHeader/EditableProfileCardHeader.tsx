import { getProfileReadonly } from "../../model/selectors/getProfileReadonly/getProfileReadonly";
import { updateProfileData } from "../../model/services/updateProfileData/updateProfileData";
import { profileActions } from "../../model/slice/profileSlice";
import { memo, useCallback } from "react";
import { useSelector } from "react-redux";
import { classNames } from "@/shared/lib/classNames/classNames";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Button, ButtonTheme } from "@/shared/ui/Button/Button";
import cls from './EditableProfileCardHeader.module.scss'
import { userActions } from "@/entities/User";


interface EditableProfileCardHeaderProps {
    className?: string;
    canEdit?: boolean;
}

export const EditableProfileCardHeader = memo((props: EditableProfileCardHeaderProps) => {
    const {
        className, canEdit
    } = props;

    const dispatch = useAppDispatch();
    const readonly = useSelector(getProfileReadonly);

    const onEdit = useCallback(() => {
        dispatch(profileActions.setReadonly(false));
    }, [dispatch]);

    const onCancelEdit = useCallback(() => {
        dispatch(profileActions.cancelEdit());
    }, [dispatch]);

    const onSave = useCallback(() => {
        dispatch(updateProfileData());
    }, [dispatch]);

    const onLogout = useCallback(() => {
        const confirmed = window.confirm('Вы действительно хотите выйти?');
        if (confirmed) {
            dispatch(userActions.logout());
        }
    }, [dispatch]);


    return (
        <div className={classNames('', {}, [className])}>
            {canEdit && (
                <div className={cls.wrapp}>
                    { readonly 
                        ? (
                        <div>
                            <Button
                                    theme={ButtonTheme.OUTLINE}
                                    onClick={onEdit}
                                    data-testid="EditableProfileCardHeader.EditButton"
                                    className={cls.btn}
                                >
                                    Редактировать
                            </Button>
                            <Button
                                theme={ButtonTheme.ACCENT}
                                onClick={onLogout}
                                data-testid="EditableProfileCardHeader.LogOutButton"
                                className={cls.btnCancel}
                            >
                                Выйти
                            </Button>
                        </div>
                        ) 
                        : ( 
                        <div>
                            <Button
                                theme={ButtonTheme.ACCENT}
                                onClick={onCancelEdit}
                                data-testid="EditableProfileCardHeader.CancelButton"
                                className={cls.btnCancel}
                            >
                                Отменить
                            </Button>

                            <Button
                                theme={ButtonTheme.BACKGROUND}
                                onClick={onSave}
                                data-testid="EditableProfileCardHeader.SaveButton"
                                className={cls.btn}
                            >
                                Сохранить
                            </Button>
                        </div>
                        
                    )}
                </div>                
            )}
            
        </div>
    )
})


