import { memo, useCallback } from "react";
import { useSelector } from "react-redux";
import { classNames } from "@/shared/lib/classNames/classNames";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";

import cls from './ProfileWishesList.module.scss'

import { getProfileData } from "../../model/selectors/getProfileData/getProfileData";
import { AppImage } from "@/shared/ui/AppImage";
import { Profile } from "@/entities/Profile";
import { useNavigate } from "react-router-dom";
import { getRouteProfile, getRouteWishDetails } from "@/shared/const/router";
import { SheetList } from "@/entities/Sheets";
import { Loader } from "@/shared/ui/Loader/Loader";


interface ProfileWishesListProps {
    className?: string;
    canEdit?: boolean;
    isLoading?: boolean;
}

export const ProfileWishesList = memo((props: ProfileWishesListProps) => {
    const {
        className, canEdit, isLoading,
    } = props;

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const profile = useSelector(getProfileData);

    // ДОБАВИТЬ ОВЕРАТОР "И" чтобы isLoading был FALSE
    if (!profile?.lists?.length) {
        return (
            <div className={cls.wrapper}>
                <div className={cls.wrapperText}>
                    У пользователя нет листов
                </div>
            </div>
        );
    }

    // console.log('profile-lists',profile.lists)
    return (
        <div className={classNames('', {}, [className])}>
            {!canEdit && (
                <div>
                    <div className={cls.wrapper}>
                        <div className={cls.text}>Листы пользователя</div>
                        {profile.lists.length > 0
                            ? <SheetList myLists={profile.lists} ownerId={profile.id}/>
                            : ''
                        } 
                    </div>
                </div>
            )}
            {isLoading && <Loader/>}
        </div>
    )
})


