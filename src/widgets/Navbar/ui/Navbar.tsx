import { classNames } from "@/shared/lib/classNames/classNames";
import cls from './Navbar.module.scss';
import { Button, ButtonTheme } from "@/shared/ui/Button/Button";
import { memo, useCallback, useState } from "react";
import { LoginModal } from "@/features/AuthByUserName";
import { useDispatch, useSelector } from "react-redux";
import { getUserAuthData } from "@/entities/User";
import { AppLink } from "@/shared/ui/AppLink/AppLink";
import { getRouteLogin, getRouteRegistration, getRouteWishCreate } from "@/shared/const/router";
import { AvatarDropdown } from "@/features/avatarDropdown";
import { RegistrationModal } from "@/features/Registration";
import { APP_NAME } from '@/shared/config/appName/appName';



interface NavbarProps {
    className?: string;
}

export const Navbar = memo(({className}: NavbarProps) => {
    const [isAuthModal, setIsAuthModal] = useState(false);
    const [isRegistrationModal, setIsRegistrationModal] = useState(false);

    const authData = useSelector(getUserAuthData);
    const dispatch = useDispatch();

    const onCloseAuthModal = useCallback(() => {
        setIsAuthModal(false);
    }, []);

    const onCloseRegistrationModal = useCallback(() => {
        setIsRegistrationModal(false);
    }, []);

    const onShowRegistrationModal = useCallback(() => {
        setIsRegistrationModal(true);
    }, []);


    if(authData) {
        return (
            <div className={cls.navbar_wrapper}>
                <div className={classNames( cls.Navbar, {}, [className])}>
                    {/* <div className={cls.logoImg}> 
                        <LOGO />
                    </div> */}
                    
                    <div className={cls.logo}>
                        {APP_NAME}
                    </div>

                    <div className={cls.links}>
                        <AppLink to={getRouteWishCreate()} className={cls.padding} >
                            Создать желание
                        </AppLink>
                        
                        <AvatarDropdown className={cls.avatar}/>
                    </div>
                </div>
                <div className={cls.ramka}></div> 
            </div>   
            
        )
    }

    return (
        <div className={cls.navbar_wrapper}>
            <div className={classNames( cls.Navbar, {}, [className])}>
                <div className={cls.logo}>
                    {APP_NAME}
                </div>
                <div className={cls.links}>
                    <AppLink to={getRouteRegistration()}>
                        <Button 
                            theme={ButtonTheme.CLEAR_INVERTED} 
                            // onClick={onShowRegistrationModal}
                        >
                            зарегистрироваться
                        </Button>
                    </AppLink>
                    <AppLink to={getRouteLogin()}>
                        <Button 
                            theme={ButtonTheme.CLEAR_INVERTED} 
                            className={cls.into}
                        >
                            войти
                        </Button>
                    </AppLink>
                    
                </div>
                
                { isAuthModal &&  <LoginModal 
                    isOpen={isAuthModal} 
                    onClose={onCloseAuthModal}
                />}
                    
                { isRegistrationModal &&  <RegistrationModal 
                    isOpen={isRegistrationModal} 
                    onClose={onCloseRegistrationModal}
                />}
            </div>
        </div>
        
    );
});

