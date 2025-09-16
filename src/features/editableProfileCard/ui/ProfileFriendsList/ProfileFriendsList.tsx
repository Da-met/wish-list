import { memo, useCallback } from "react";
import { useSelector } from "react-redux";
import { classNames } from "@/shared/lib/classNames/classNames";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";

import cls from './ProfileFriendsList.module.scss'

import { getProfileData } from "../../model/selectors/getProfileData/getProfileData";
import { AppImage } from "@/shared/ui/AppImage";
import { Profile } from "@/entities/Profile";
import { useNavigate } from "react-router-dom";
import { getRouteProfile, getRouteWishDetails } from "@/shared/const/router";
import { Loader } from "@/shared/ui/Loader/Loader";


interface ProfileFriendsListProps {
    className?: string;
    canEdit?: boolean;
    isLoading?: boolean;
}

export const ProfileFriendsList = memo((props: ProfileFriendsListProps) => {
    const {
        className, canEdit, isLoading
    } = props;

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const profile = useSelector(getProfileData);

    const onListIcon = useCallback((profile: Profile) => {
        navigate(getRouteProfile(String(profile.id)))
    }, [dispatch]);

    if (!profile?.Subscriptions?.length) {
        return (
            // <div className={cls.wrapper}>
                <p className={cls.wrapperText}>
                    У пользователя нет друзей
                </p>
            // </div>
        );
    }

    const renderListWish = (profile: Profile ) => (
        <AppImage
            src={typeof profile.img === 'string' ? profile.img : '/placeholder.jpg'} 
            className={cls.img}
            onClick={() => onListIcon(profile)}
        />
    );


    return (
        <div className={classNames('', {}, [className])}>
            {!canEdit && (
                <div>
                    <div className={cls.wrapper}>
                        <div className={cls.text}>Друзья пользователя</div>
                        <div className={cls.wrapperListFr}>
                            {profile.Subscriptions.length > 0
                                ? profile.Subscriptions.map(renderListWish)
                                : ''
                            } 
                        </div>
                    </div>
                </div>
            )}
            {isLoading && <Loader/>}
        </div>
    )
})


