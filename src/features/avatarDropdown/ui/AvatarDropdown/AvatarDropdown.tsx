import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, useCallback, useEffect, useState } from 'react';
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
    console.log(authData)
    const [avatarError, setAvatarError] = useState(false);

    const onLogout = useCallback(() => {
        const confirmed = window.confirm('Вы действительно хотите выйти?');
        if (confirmed) {
            dispatch(userActions.logout());
        }
    }, [dispatch]);

    const handleImageError = useCallback(() => {
        console.error('Avatar load error:', authData?.img); // Добавим лог
        setAvatarError(true);
    }, [authData?.img]);

    if (!authData) {
        return null;
    }

    // console.log('Avatar data:', {
    //     hasImg: !!authData.img,
    //     imgUrl: authData.img,
    //     username: authData.name
    // });



    return (
        <>
        <Dropdown 
            direction="bottom left"
            className={classNames( cls.dropdown, {}, [className])}
            items={[
                {
                    content: 'Профиль',
                    href: getRouteProfile(String(authData.id)),
                },
                {
                    content: 'Выйти',
                    onClick: onLogout,
                },
            ]} 
            trigger={
                <img className={cls.avatar} src={authData.img } alt="" />
            }

            // trigger={
            //     <div className={cls.avatarWrapper}>
            //         {authData.img && !avatarError ? (
            //             <img 
            //                 className={cls.avatar}
            //                 src={authData.img} 
            //                 alt={authData.name || 'User'}
            //                 onError={handleImageError}
            //                 onLoad={() => console.log('Avatar loaded successfully')}
            //             />
            //         ) : (
            //             <div className={cls.avatarFallback}>
            //                 {authData.name?.[0]?.toUpperCase() || 'U'}
            //             </div>
            //         )}
            //     </div>
            // }


        />
        {/* <Button onClick={onLogout}>DELETE</Button> */}
        </>
    );
});
