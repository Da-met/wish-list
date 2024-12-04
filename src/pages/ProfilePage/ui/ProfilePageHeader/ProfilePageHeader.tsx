import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { Text, TextAlign, TextTheme } from 'shared/ui/Text/Text';
import cls from './ProfilePageHeader.module.scss';
import { classNames } from "shared/lib/classNames/classNames";
import { useSelector } from "react-redux";
import { useCallback } from "react";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { getProfileReadonly, profileActions } from "entities/Profile";
import { updateProfileData } from "entities/Profile/model/services/updateProfileData/updateProfileData";




interface ProfilePageHeaderProps {
    className?: string;
}



export const ProfilePageHeader = (props: ProfilePageHeaderProps) => {
    const {
        className,
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


    return (
        <div className={classNames(cls.ProfilePageHeader, {}, [className])}>
            <Text title='Профиль' />
            { readonly 
                ? (
                <Button
                        className={cls.editBtn}
                        theme={ButtonTheme.OUTLINE}
                        onClick={onEdit}
                    >
                        Редактировать
                </Button>) 
                : ( 
                <div>
                    <Button
                        className={cls.editBtn}
                        theme={ButtonTheme.OUTLINE}
                        onClick={onCancelEdit}
                    >
                        Отменить
                    </Button>

                    <Button
                        className={cls.editBtn}
                        theme={ButtonTheme.RED}
                        onClick={onSave}
                    >
                        Сохранить
                    </Button>
                </div>
                
                )
            }
        </div>
    )
}