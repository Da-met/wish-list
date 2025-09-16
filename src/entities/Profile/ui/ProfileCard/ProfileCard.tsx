import { useSelector } from "react-redux";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Text, TextAlign, TextTheme } from '@/shared/ui/Text/Text';
import cls from './ProfileCard.module.scss';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import { Profile } from "@/entities/Profile/model/types/profile";
import { Loader } from "@/shared/ui/Loader/Loader";
import { Input } from "@/shared/ui/Input/Input";
import { InputImg } from "@/shared/ui/InputImg/InputImg";
import { useCallback, useMemo } from "react";
import { AppLink } from "@/shared/ui/AppLink/AppLink";

import Friends from '@/shared/assets/icons/users.svg';
import Lists from '@/shared/assets/icons/file-text.svg';
import Cake from '@/shared/assets/icons/cake.svg';
import UserPlus from '@/shared/assets/icons//user-plus.svg';
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { addFriend } from "@/pages/FriendsPage/model/services/addFriend/addFriend";
import { getFriendsIds } from "@/pages/FriendsPage/model/selectors/friendsPageSelectors";
import { getRouteFriends, getRouteList } from "@/shared/const/router";
import { fetchFriendsList } from "@/pages/FriendsPage/model/services/fetchFriendsList/fetchFriendsList";
import { formatBirthday } from "@/shared/lib/formatBirthday/formatBirthday";
import { getUserAuthData } from "@/entities/User";


interface ProfileCardProps {
    className?: string;
    data?: Profile;
    error?: string;
    isLoading?: boolean;
    readonly?: boolean;
    onChangeName: (value?: string) => void;
    onChangeImg: (base64: string | null) => void;
    canEdit: boolean;
    profileId?: number;
}

export const ProfileCard = (props: ProfileCardProps) => {
    const { className, data, error, readonly, isLoading, onChangeName, onChangeImg, canEdit, profileId} = props;

    const authData = useSelector(getUserAuthData);
    const isAuth = Boolean(authData);
    
    if(isLoading) {
        return (<Loader />)
    }

    if(error) {
        return (
            <div className={classNames(cls.ProfileCard, {}, [className, cls.error])}>
                <Text theme={TextTheme.ERROR} 
                    title='Произошла ошибка при загрузке профиля' 
                    text='Попробуйте обновить страницу'
                    align={TextAlign.CENTER}
                />
            </div>
        )
    }
    const dispatch = useAppDispatch();
    const preparedImg = useMemo(() => {
        if (typeof data?.img === 'string') return data.img;
        if (data?.img instanceof File) return URL.createObjectURL(data.img);
        return undefined;
    }, [data?.img]);

    const addFriendtoList = useCallback(async () => {
        if (!data?.id || !profileId) return;
        const res = await dispatch(addFriend({ userId: profileId, subscriptionId: data.id }));
    
        if (addFriend.fulfilled.match(res)) {
            dispatch(fetchFriendsList({ idUser: profileId }));
        }
    }, [dispatch, data?.id, profileId]);

    const friendsIdsList = useSelector(getFriendsIds);
    let friendsOrNo
    if (friendsIdsList !== undefined ) {
        friendsOrNo = Boolean(friendsIdsList.find((value) => value == data?.id))
    };

    return (
        <div className={cls.paddingProfile}>
            <div className={cls.wrapp}>
                <div className={classNames(cls.ProfileCard, {}, [className])}>
                    <div className={cls.profileContent}>
                        <div className={cls.input}>
                            <Input
                                value={data?.name}
                                placeholder=''
                                onChange={onChangeName}
                                readonly={readonly}
                                data-testid="ProfileCard.firstname"
                            />
                        </div>

                        <div  className={cls.dr}>
                            <Cake className={cls.cake}/> 
                            {formatBirthday(data?.birthday)}
                        </div>

                        <div className={cls.friendOrNo}>
                            {/* 🔐 Показываем кнопку только авторизованным пользователям */}
                            {!canEdit && isAuth && (
                                friendsOrNo == false ? (
                                    <Button 
                                        className={cls.addFriends} 
                                        onClick={addFriendtoList}
                                        theme={ButtonTheme.ACCENT}
                                    >
                                        <UserPlus /> Добавить в друзья
                                    </Button>
                                ) : (
                                    <div className={cls.inFr}>У вас в друзьях</div>
                                )
                            )}
                        </div>  
                    </div>

                    {/* 🔐 Подсказка для неавторизованных пользователей */}
                    {!canEdit && !isAuth && (
                        <div className={cls.authHint}>
                            Войдите, чтобы добавить в друзья
                        </div>
                    )}
                </div>
                
                
                <InputImg 
                    className={cls.inputImg}
                    value={preparedImg} 
                    onChange={onChangeImg} 
                    readonly={readonly}
                /> 
            </div>
        </div>
    )
};

