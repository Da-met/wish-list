import { getProfileData } from "features/editableProfileCard/model/selectors/getProfileData/getProfileData";
import { User } from "entities/User";
import { useSelector } from "react-redux";
import { classNames, Mods } from "shared/lib/classNames/classNames";
import { Text, TextAlign, TextTheme } from 'shared/ui/Text/Text';
import cls from './ProfileCard.module.scss';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Profile } from "entities/Profile/model/types/profile";
import { Loader } from "shared/ui/Loader/Loader";
import { Input } from "shared/ui/Input/Input";
import { InputImg } from "shared/ui/InputImg/InputImg";
import { useMemo } from "react";


interface ProfileCardProps {
    className?: string;
    data?: Profile;
    error?: string;
    isLoading?: boolean;
    readonly?: boolean;
    onChangeName: (value?: string) => void;
    onChangeImg: (base64: string | null) => void;
}

export const ProfileCard = (props: ProfileCardProps) => {
    const { className, data, error, isLoading, readonly, onChangeName, onChangeImg} = props;

    if(isLoading) {
        return (
            <div className={classNames(cls.ProfileCard, {[cls.loading]: true}, [className])}>
                <Loader />
            </div>
        )
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

    const preparedImg = useMemo(() => {
        if (typeof data?.img === 'string') return data.img;
        if (data?.img instanceof File) return URL.createObjectURL(data.img);
        return undefined;
    }, [data?.img]);

    return (
        <div className={classNames(cls.ProfileCard, {}, [className])}>
                <InputImg 
                    className={cls.inputImg}
                    value={preparedImg} // URL текущей аватарки пользователя
                    onChange={onChangeImg} // Callback для изменения картинки
                    readonly={readonly}
                />

                <Input
                    value={data?.name}
                    placeholder='Ваше имя'
                    className={cls.input}
                    onChange={onChangeName}
                    readonly={readonly}
                    data-testid="ProfileCard.firstname"
                />


        </div>
    )
};

