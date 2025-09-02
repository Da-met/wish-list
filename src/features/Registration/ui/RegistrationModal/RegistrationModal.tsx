import { classNames } from "@/shared/lib/classNames/classNames";
import cls from './RegistrationModal.module.scss';
import { Modal } from "@/shared/ui/Modal/Modal";
import { Suspense } from "react";
// import { LoginFormAsync } from "../LoginForm/LoginForm.async";
import { Loader } from "@/shared/ui/Loader/Loader";
import { RegistrationFormAsync } from "../RegistrationForm/RegistrationForm.async";

interface RegistrationModalProps {
    className?: string;
    isOpen: boolean;
    onClose: () => void;
}

export const RegistrationModal = ({className, isOpen, onClose}: RegistrationModalProps) => {
    return (
        <Modal
            className={classNames(cls.RegistrationModal, {}, [className])}
            isOpen={isOpen}
            onClose={onClose}
        >
            <Suspense fallback={<Loader/>}>
                <RegistrationFormAsync onSuccess={onClose}/>
            </Suspense>
            
        </Modal>
    )
}