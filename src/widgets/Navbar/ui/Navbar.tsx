import { classNames } from "shared/lib/classNames/classNames";
import cls from './Navbar.module.scss';
import { Modal } from "shared/ui/Modal/Modal";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { memo, useCallback, useState } from "react";
import { LoginModal } from "features/AuthByUserName";
import { useDispatch, useSelector } from "react-redux";
import { getUserAuthData, userActions } from "entities/User";

interface NavbarProps {
    className?: string;
}

export const Navbar = memo(({className}: NavbarProps) => {
    const [isAuthModal, setIsAuthModal] = useState(false);
    const authData = useSelector(getUserAuthData);
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
                <Button 
                    theme={ButtonTheme.CLEAR_INVERTED} 
                    className={cls.links}
                    onClick={onLogout}
                >
                    выйти
                </Button>
            </div>
        )
    }

    return (
        <div className={classNames( cls.Navbar, {}, [className])}>
            <Button 
                theme={ButtonTheme.CLEAR_INVERTED} 
                className={cls.links}
                onClick={onShowModal}
            >
                войти
            </Button>
            { isAuthModal &&   <LoginModal 
                isOpen={isAuthModal} 
                onClose={onCloseModal}
            />}
        </div>
    );
});

