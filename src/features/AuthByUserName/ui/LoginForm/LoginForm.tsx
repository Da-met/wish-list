import { classNames } from "shared/lib/classNames/classNames";
import cls from './LoginForm.module.scss';
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { Input } from "shared/ui/Input/Input";
import { InputImg } from "shared/ui/InputImg/InputImg";

interface LoginFormProps {
    className?: string;
}

export const LoginForm = ({className}: LoginFormProps) => {
    return (
        <div className={classNames(cls.LoginForm, {}, [className])} >
            <div className={classNames(cls.inputs)}>
                <InputImg ></InputImg>
                <div className={cls.testImputs}>
                    <Input type="text" className={cls.input} placeholder="Введите Имя"/>
                    <Input type="text" className={cls.input} placeholder="Введите почту"/>
                    <Input type="text" className={cls.input} placeholder="Введите пароль"/>
                </div>
            </div>
            
            
            <Button className={cls.loginBtn} theme={ButtonTheme.X}>
                зарегистрироваться 
            </Button>
        </div>
    )
}