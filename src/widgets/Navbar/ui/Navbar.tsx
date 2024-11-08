import { classNames } from "shared/lib/classNames/classNames";
import cls from './Navbar.module.scss';
import { Modal } from "shared/ui/Modal/Modal";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { useCallback, useState } from "react";

interface NavbarProps {
    className?: string;
}

export const Navbar = ({className}: NavbarProps) => {
    const [isAuthModal, setIsAuthModal] = useState(false);
    const onToggleModal = useCallback(() => {
        setIsAuthModal((prev) => !prev);
    }, []);

    return (
        <div className={classNames( cls.Navbar, {}, [className])}>
            <Button 
                theme={ButtonTheme.CLEAR_INVERTED} 
                className={cls.links}
                onClick={onToggleModal}
            >
                войти
            </Button>
            <Modal isOpen={isAuthModal} onClose={onToggleModal}>
                    <div>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et deleniti itaque repellendus explicabo eligendi. Quod pariatur consequuntur odio rerum est in assumenda asperiores ipsum. Adipisci iure voluptatem iusto voluptates mollitia?</div>
            </Modal>
        </div>
    );
};

