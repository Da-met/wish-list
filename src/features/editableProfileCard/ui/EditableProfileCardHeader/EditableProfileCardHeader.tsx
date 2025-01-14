import { getUserAuthData } from "entities/User";
import { getProfileData } from "../../model/selectors/getProfileData/getProfileData";
import { getProfileReadonly } from "../../model/selectors/getProfileReadonly/getProfileReadonly";
import { updateProfileData } from "../../model/services/updateProfileData/updateProfileData";
import { profileActions } from "../../model/slice/profileSlice";
import { memo, useCallback } from "react";
import { useSelector } from "react-redux";
import { classNames } from "shared/lib/classNames/classNames";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { Text } from 'shared/ui/Text/Text';


interface EditableProfileCardHeaderProps {
    className?: string;
}

export const EditableProfileCardHeader = memo((props: EditableProfileCardHeaderProps) => {
    const {
        className,
    } = props;

    const dispatch = useAppDispatch();
    const authData = useSelector(getUserAuthData);
    const profileData = useSelector(getProfileData);
    const canEdit = authData?.id === profileData?.id;

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


    return (
        <div className={classNames('', {}, [className])}>
            <Text title='Профиль' />
            {canEdit && (
                <div>
                    { readonly 
                        ? (
                        <Button
                                theme={ButtonTheme.OUTLINE}
                                onClick={onEdit}
                                data-testid="EditableProfileCardHeader.EditButton"
                            >
                                Редактировать
                        </Button>) 
                        : ( 
                        <div>
                            <Button
                                theme={ButtonTheme.OUTLINE}
                                onClick={onCancelEdit}
                                data-testid="EditableProfileCardHeader.CancelButton"
                            >
                                Отменить
                            </Button>

                            <Button
                                theme={ButtonTheme.RED}
                                onClick={onSave}
                                data-testid="EditableProfileCardHeader.SaveButton"
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


