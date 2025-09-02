import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { getRouteProfile } from "@/shared/const/router";

import { Dropdown } from '@/shared/ui/Popups';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAuthData, userActions } from '@/entities/User';
import cls from './AvatarDropdown.module.scss';
import { Button } from '@/shared/ui/Button/Button';


interface AvatarDropdownProps {
    className?: string;
}



export const AvatarDropdown = memo((props: AvatarDropdownProps) => {
    const { className } = props;
    const dispatch = useDispatch();
    const authData = useSelector(getUserAuthData);

    const onLogout = useCallback(() => {
        const confirmed = window.confirm('Вы действительно хотите выйти?');
        if (confirmed) {
            dispatch(userActions.logout());
        }
    }, [dispatch]);

    if (!authData) {
        return null;
    }

    return (
        <>
        <Dropdown 
            direction="bottom left"
            // className={cls.dropdown}
            className={classNames( cls.dropdown, {}, [className])}
            items={[
                {
                    content: 'Профиль',
                    href: getRouteProfile(String(authData.id)),
                },
                {
                    content: 'выйти',
                    onClick: onLogout,
                },
            ]} 
            trigger={
                <img className={cls.avatar} src={authData.img } alt="" />
            }
        />
        {/* <Button onClick={onLogout}>DELETE</Button> */}
        </>
    );
});
