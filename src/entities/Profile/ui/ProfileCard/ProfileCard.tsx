import { getProfileData } from "entities/Profile/model/selectors/getProfileData/getProfileData";
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


interface ProfileCardProps {
    className?: string;
    data?: Profile;
    error?: string;
    isLoading?: boolean;
    readonly?: boolean;
    onChangeName: (value?: string) => void;
    onChangeImg: (file: File | null) => void;
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

    return (
        <div className={classNames(cls.ProfileCard, {}, [className])}>
                <InputImg 
                    className={cls.inputImg}
                    value={data?.img} // URL текущей аватарки пользователя
                    onChange={onChangeImg} // Callback для изменения картинки
                    readonly={readonly}
                />

                <Input
                    value={data?.name}
                    placeholder='Ваше имя'
                    className={cls.input}
                    onChange={onChangeName}
                    readonly={readonly}
                />


        </div>
    )
};

