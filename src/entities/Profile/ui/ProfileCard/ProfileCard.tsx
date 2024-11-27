import { getProfileData } from "entities/Profile/model/selectors/getProfileData/getProfileData";
import { getUserAuthData } from "entities/User";
import { useSelector } from "react-redux";
import { classNames } from "shared/lib/classNames/classNames";
import { Text } from 'shared/ui/Text/Text';
import cls from './ProfileCard.module.scss';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';


interface ProfileCardProps {
    className?: string;
}

export const ProfileCard = ({className}: ProfileCardProps) => {
    const data = useSelector(getUserAuthData);
    console.log(data)

    return (
        <div>
            <Text title='Профиль' />
            <Button
                    className={cls.editBtn}
                    theme={ButtonTheme.OUTLINE}
                >
                    Редактировать
                </Button>
        </div>
    )
};

