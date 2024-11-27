import { classNames, Mods } from "shared/lib/classNames/classNames";
import { MutableRefObject, ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { Button, ButtonTheme } from "../Button/Button";
import { Portal } from "../Portal/Portal";
import { useTheme } from "app/providers/ThemeProvider";
import cls from './Modal.module.scss';


interface ModalProps {
    className?: string;
    children?: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
    lazy?: boolean;
}

const ANIMATION_DELAY = 300;


export const Modal = (props: ModalProps) => {
    const {
        className,
        children,
        isOpen,
        onClose,
        lazy,
    } = props;

    const [ isClosing, setIsClosing ] = useState(false);
    const [ isMounted, setIsMounted ] = useState(false);
    const timerRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>;
    const { theme } = useTheme();

    useEffect(() => {
        if(isOpen) {
            setIsMounted(true);
        }
    }, [isOpen]);

    const closeHandler = useCallback(() => {
        if (onClose) {
            setIsClosing(true);
            timerRef.current = setTimeout(() => {
                onClose();
                setIsClosing(false);
            }, ANIMATION_DELAY)
        }
    }, [onClose]);

    const onKeyDown = useCallback((e: KeyboardEvent) => {
        if(e.key === 'Escape') {
            closeHandler();
        }
    }, [closeHandler]);

    useEffect(() => {
        if(isOpen) {
            window.addEventListener('keydown', onKeyDown)
        }
        return () => {
            clearTimeout(timerRef.current);
            window.removeEventListener('keydown', onKeyDown)
        }
    }, [isOpen, onKeyDown]);

    const mods: Mods = {
        [cls.opened]: isOpen,
        [cls.isClosing]: isClosing,
    };

    if(lazy && !isMounted) {
        return null;
    }

    return (
        <Portal >
            <div className={classNames(cls.Modal, mods, [className, theme, 'app_modal'])}>
                <div className={cls.overlay}>
                        <div className={cls.content}>

                                <Button 
                                        theme={ButtonTheme.X} 
                                        className={cls.btn}
                                        onClick={closeHandler}
                                    >
                                        ✕
                                </Button>
                                
                                <div className={cls.field}> 
                                        {children}
                                </div>

                        </div>
                </div>
            </div>
        </Portal>
    );

}