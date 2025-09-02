import { classNames, Mods } from "@/shared/lib/classNames/classNames";
import { MutableRefObject, ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { Button, ButtonTheme } from "../Button/Button";
import { Portal } from "../Portal/Portal";
import { useTheme } from "@/app/providers/ThemeProvider";
import cls from './Modal.module.scss';
import { useModal } from "@/shared/lib/hooks/useModal/useModal";
import { Overlay } from "../Overlay/Overlay";
import Delete from '@/shared/assets/icons/x.svg';


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

    const {
        close,
        isClosing,
        isMounted,
    } = useModal({
        animationDelay: ANIMATION_DELAY,
        onClose,
        isOpen,
    });

    const { theme } = useTheme();

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
                {/* <div className={cls.overlay}> */}

                    <Overlay onClick={close} />
                    <div className={cls.content}>
                        {/* <Button 
                            theme={ButtonTheme.UNDERLINE} 
                            className={cls.btn}
                            onClick={close}
                        >
                            ✕
                        </Button> */}

                        <Button 
                                className={cls.btn}
                                theme={ButtonTheme.CLEAR}
                                onClick={close}
                            >
                                <Delete/>
                            </Button>
                        
                        <div className={cls.field}> 
                            {children}
                        </div>
                    </div>

                {/* </div> */}
            </div>
        </Portal>
    );

}