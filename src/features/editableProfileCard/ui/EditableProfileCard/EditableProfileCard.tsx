import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { Text, TextTheme } from '@/shared/ui/Text/Text';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { getProfileForm } from '../../model/selectors/getProfileForm/getProfileForm';
import { getProfileIsLoading } from '../../model/selectors/getProfileIsLoading/getProfileIsLoading';
import { getProfileError } from '../../model/selectors/getProfileError/getProfileError';
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import { fetchProfileData } from '../../model/services/fetchProfileData/fetchProfileData';
import { profileActions, profileReducer } from '../../model/slice/profileSlice';
import { ProfileCard } from '@/entities/Profile';
import { EditableProfileCardHeader } from '../EditableProfileCardHeader/EditableProfileCardHeader';
import cls from './EditableProfileCard.module.scss'
import { getProfileValidateErrors } from '../../model/selectors/getProfileValidateErrors/getProfileValidateErrors';
import { ValidateProfileError } from '../../model/types/editableProfileCardSchema';
import { getUserAuthData } from '@/entities/User';
import { getProfileData } from '../../model/selectors/getProfileData/getProfileData';
import { ProfileFriendsList } from '../ProfileFriendsList/ProfileFriendsList';
import { ProfileWishesList } from '../ProfileWishesList/ProfileWishesList';
import { Loader } from '@/shared/ui/Loader/Loader';
import { SeoHead } from '@/shared/ui/SeoHead/SeoHead';
import { APP_IMG, APP_NAME } from '@/shared/config/appName/appName';
import { StateSchema } from '@/app/providers/StoreProvider';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';





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
    const [isInitialized, setIsInitialized] = useState(false);

    const profileState = useSelector((state: StateSchema) => ({
        formData: getProfileForm(state),
        isLoading: getProfileIsLoading(state),
        error: getProfileError(state),
        readonly: getProfileReadonly(state),
        validateErrors: getProfileValidateErrors(state),
        profileData: getProfileData(state),
    }));

    const authData = useSelector(getUserAuthData);
    
    const canEdit = useMemo(() => 
        authData?.id === profileState.profileData?.id, 
        [authData?.id, profileState.profileData?.id]
    );

    const validateErrors = useSelector(getProfileValidateErrors);
    const validateErrorTranslates = {
        [ValidateProfileError.SERVER_ERROR]: 'Серверная ошибка при сохранении',
        [ValidateProfileError.NO_DATA]: 'Данные не указаны',
        [ValidateProfileError.INCORRECT_USER_DATA]: 'Имя и фамилия обязательны',
    };

    useEffect(() => {
        if (id && !isInitialized) {
            dispatch(fetchProfileData(id)).finally(() => {
                setIsInitialized(true);
            });
        }
        return () => {
            dispatch(profileActions.clearProfile());
            setIsInitialized(false);
        };
    }, [id, dispatch]);

    const onChangeName = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({ name: value || '' }));
    }, [dispatch]);

    const onChangeImg = useCallback((base64?: string | null) => {
        dispatch(profileActions.updateProfile({ img: base64 }));
    }, [dispatch]);

 
    const title = canEdit 
        ? `Профиль ${profileState.profileData?.name || ''} — ${APP_NAME}`
        : `Профиль пользователя — ${APP_NAME}`;

    const description = canEdit 
        ? `Редактируйте свой профиль: имя, фото и личные данные.`
        : `Профиль ${profileState.profileData?.name || 'пользователя'} в ${APP_NAME}.`;

    return (
        <DynamicModuleLoader reducers={reducers}>
            {/*  SEO */}
            <SeoHead
                title={title}
                description={description}
                url={`https://vishy.vercel.app/profile/${id}`}
                image={
                    typeof profileState.profileData?.img === 'string' 
                        ? profileState.profileData.img 
                        : `${APP_IMG}`
                }
            />
            {validateErrors?.length && validateErrors.map((err) => (
                    <Text
                        key={err}
                        theme={TextTheme.ERROR}
                        text={validateErrorTranslates[err]}
                        data-testid="EditableProfileCard.Error"
                    />
                ))}
            <Text title='Профиль' className={cls.title} titleTag="h1"/>

            {profileState.isLoading 
                ?   
                    <div className={cls.wrapperSkeleton}>
                        <Skeleton className={cls.skeletonProfile}/>
                        <Skeleton className={cls.skeletonLi}/>
                        <Skeleton className={cls.skeletonLi}/>
                    </div>
                :
                    <div>
                        <ProfileCard 
                            data={profileState.formData}
                            // idUser={authData?.id}
                            profileId={authData?.id}
                            isLoading={profileState.isLoading}
                            error={profileState.error}
                            readonly={profileState.readonly}
                            onChangeName={onChangeName}
                            onChangeImg={onChangeImg}
                            canEdit={canEdit}
                        />
                        <EditableProfileCardHeader canEdit={canEdit} className={cls.header} />
                        {!canEdit && (
                            <>
                                <ProfileFriendsList canEdit={canEdit} className={cls.list} isLoading={profileState.isLoading}/>
                                <ProfileWishesList canEdit={canEdit} className={cls.list} isLoading={profileState.isLoading}/>
                            </>
                        )}
                    </div>
            }

        </DynamicModuleLoader>
    )
});