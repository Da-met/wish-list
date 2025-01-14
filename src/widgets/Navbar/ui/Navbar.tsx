import { classNames } from "shared/lib/classNames/classNames";
import cls from './Navbar.module.scss';
import { Modal } from "shared/ui/Modal/Modal";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { memo, useCallback, useState } from "react";
import { LoginModal } from "features/AuthByUserName";
import { useDispatch, useSelector } from "react-redux";
import { getUserAuthData, userActions } from "entities/User";
import { Text } from "shared/ui/Text/Text";
import { AppLink } from "shared/ui/AppLink/AppLink";
import { RoutePath } from "shared/config/routeConfig/routeConfig";
import { Dropdown } from "shared/ui/Dropdown/Dropdown";

interface NavbarProps {
    className?: string;
}

export const Navbar = memo(({className}: NavbarProps) => {
    const [isAuthModal, setIsAuthModal] = useState(false);
    const authData = useSelector(getUserAuthData);
    console.log(authData)
    const dispatch = useDispatch();

    const onCloseModal = useCallback(() => {
        setIsAuthModal(false);
    }, []);

    const onShowModal = useCallback(() => {
        setIsAuthModal(true);
    }, []);

    const onLogout = useCallback(() => {
        dispatch(userActions.logout())
    }, [dispatch]);

    if(authData) {
        return (
            <div className={classNames( cls.Navbar, {}, [className])}>
                <Text title={'GRAB'}/>
                <div className={cls.links}>
                    <AppLink to={RoutePath.wish_create} >
                        Создать желание
                    </AppLink>
                    <Dropdown 
                        direction="bottom left"
                        className={cls.dropdown}
                        items={[
                            {
                                content: 'Профиль',
                                href: RoutePath.profile + authData.id,
                            },
                            {
                                content: 'выйти',
                                onClick: onLogout,
                            },
                        ]} 
                        trigger={
                            <img className={cls.avatar} src={authData.img} alt="" />
                        }
                    />
                    {/* <Button 
                        theme={ButtonTheme.CLEAR_INVERTED} 
                        onClick={onLogout}
                    >
                        выйти
                    </Button> */}
                </div>
                
            </div>
        )
    }

    return (
        <div className={classNames( cls.Navbar, {}, [className])}>
            <Text title={'GRAB'}/>
            <Button 
                theme={ButtonTheme.CLEAR_INVERTED} 
                className={cls.links}
                onClick={onShowModal}
            >
                войти
            </Button>
            { isAuthModal &&  <LoginModal 
                isOpen={isAuthModal} 
                onClose={onCloseModal}
            />}
        </div>
    );
});

