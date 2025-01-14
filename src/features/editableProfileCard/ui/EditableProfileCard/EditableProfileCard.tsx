import { classNames } from 'shared/lib/classNames/classNames';

import { memo, useCallback } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';

import { Text, TextTheme } from 'shared/ui/Text/Text';
// import { fetchProfileData, getProfileError, getProfileForm, getProfileIsLoading, getProfileReadonly, profileActions, ProfileCard, profileReducer } from 'entities/Profile';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

import { getProfileForm } from '../../model/selectors/getProfileForm/getProfileForm';
import { getProfileIsLoading } from '../../model/selectors/getProfileIsLoading/getProfileIsLoading';
import { getProfileError } from '../../model/selectors/getProfileError/getProfileError';
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import { fetchProfileData } from '../../model/services/fetchProfileData/fetchProfileData';
import { profileActions, profileReducer } from '../../model/slice/profileSlice';
import { ProfileCard } from 'entities/Profile';
import { EditableProfileCardHeader } from '../EditableProfileCardHeader/EditableProfileCardHeader';
import cls from './EditableProfileCard.module.scss'
import { getProfileValidateErrors } from '../../model/selectors/getProfileValidateErrors/getProfileValidateErrors';
import { ValidateProfileError } from '../../model/types/editableProfileCardSchema';



interface EditableProfileCardProps {
    className?: string;
    id: string;
}

const reducers: ReducersList = {
    profile: profileReducer,
}



export const EditableProfileCard = memo((props: EditableProfileCardProps) => {
    const { className, id } = props;
    
    const dispatch = useAppDispatch();
    const formData = useSelector(getProfileForm);
    const isLoading = useSelector(getProfileIsLoading);
    const error = useSelector(getProfileError);
    const readonly = useSelector(getProfileReadonly);

    const validateErrors = useSelector(getProfileValidateErrors);
    const validateErrorTranslates = {
        [ValidateProfileError.SERVER_ERROR]: 'Серверная ошибка при сохранении',
        [ValidateProfileError.NO_DATA]: 'Данные не указаны',
        [ValidateProfileError.INCORRECT_USER_DATA]: 'Имя и фамилия обязательны',

        // [ValidateProfileError.INCORRECT_COUNTRY]: 'Некорректный регион',
        // [ValidateProfileError.INCORRECT_AGE]: 'Некорректный возраст',
    };

    useInitialEffect(() => {
        if (id) {
            dispatch(fetchProfileData(id));
        }
    })

    const onChangeName = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({ name: value || '' }));
    }, [dispatch]);

    const onChangeImg = useCallback((base64?: string | null) => {
        dispatch(profileActions.updateProfile({ img: base64 }));
    }, [dispatch]);

    return (
        <DynamicModuleLoader reducers={reducers}>
            <EditableProfileCardHeader className={cls.header}/>

            {validateErrors?.length && validateErrors.map((err) => (
                    <Text
                        key={err}
                        theme={TextTheme.ERROR}
                        text={validateErrorTranslates[err]}
                        data-testid="EditableProfileCard.Error"
                    />
                ))}

            <ProfileCard 
                data={formData}
                isLoading={isLoading}
                error={error}
                readonly={readonly}
                onChangeName={onChangeName}
                onChangeImg={onChangeImg}
            />
        </DynamicModuleLoader>
    )
});