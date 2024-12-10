import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import {
    fetchProfileData,
    getProfileError,
    getProfileForm,
    getProfileIsLoading,
    getProfileReadonly,
    profileActions,
    ProfileCard,
    profileReducer,
} from 'entities/Profile';
import { useCallback, useEffect } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { ProfilePageHeader } from './ProfilePageHeader/ProfilePageHeader';
import { getUserAuthData } from 'entities/User';
import cls from './ProfilePage.module.scss';



const reducers: ReducersList = {
    profile: profileReducer,
}


interface ProfilePageProps {
    className?: string;
}

const ProfilePage = ({className}: ProfilePageProps) => {
    const user = useSelector(getUserAuthData);

    const dispatch = useAppDispatch();
    const formData = useSelector(getProfileForm);
    const isLoading = useSelector(getProfileIsLoading);
    const error = useSelector(getProfileError);
    const readonly = useSelector(getProfileReadonly);

    useEffect(() => {
        if (user?.id) { // Проверяем, что объект пользователя уже загружен
            dispatch(fetchProfileData(String(user.id)));
        }
    }, [dispatch, user]);


    const onChangeName = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({ name: value || '' }));
    }, [dispatch]);

    const onChangeImg = useCallback((base64?: string | null) => {
        dispatch(profileActions.updateProfile({ img: base64 }));
    }, [dispatch]);
    

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <div className={cls.profilePageModule}>
                <ProfilePageHeader/>

                <ProfileCard 
                    data={formData}
                    isLoading={isLoading}
                    error={error}
                    readonly={readonly}
                    onChangeName={onChangeName}
                    onChangeImg={onChangeImg}
                />
            </div>
        </DynamicModuleLoader>
    )
}

export default ProfilePage;