import { classNames } from "@/shared/lib/classNames/classNames";
import cls from './LoginForm.module.scss';
import { Button, ButtonTheme } from "@/shared/ui/Button/Button";
import { Input } from "@/shared/ui/Input/Input";
import { useSelector } from "react-redux";
import { memo, useCallback } from "react";
import { loginActions, loginReducer } from "../../model/slice/loginSlice";
import { loginByUsername } from "../../model/services/loginByUsername/loginByUsername";
import { Text, TextTheme } from '@/shared/ui/Text/Text';
import { getLoginUsername } from "../../model/selectors/getLoginUsername/getLoginUsername";
import { getLoginEmile } from "../../model/selectors/getLoginEmail/getLoginEmail";
import { getLoginPassword } from "../../model/selectors/getLoginPassword/getLoginPassword";
import { getLoginError } from "../../model/selectors/getLoginError/getLoginError";
import { getLoginIsLoading } from "../../model/selectors/getLoginIsLoading/getLoginIsLoading";
import { DynamicModuleLoader, ReducersList } from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { SeoHead } from "@/shared/ui/SeoHead/SeoHead";
import { APP_NAME } from "@/shared/config/appName/appName";



export interface LoginFormProps {
    className?: string;
    onSuccess: () => void;
}

const initialReducers: ReducersList = {
    loginForm: loginReducer,
}


const LoginForm = memo(({className, onSuccess}: LoginFormProps) => {
    const dispatch = useAppDispatch();

    const username = useSelector(getLoginUsername);
    const email = useSelector(getLoginEmile);
    const password = useSelector(getLoginPassword);
    const error = useSelector(getLoginError);
    const isLoading = useSelector(getLoginIsLoading);


    const onChangeUsername = useCallback((value: string) => {
        dispatch(loginActions.setUsername(value))
    }, [dispatch]);

    const onChangePassword = useCallback((value: string) => {
        dispatch(loginActions.setPassword(value))
    }, [dispatch]);

    const onChangeEmail = useCallback((value: string) => {
        dispatch(loginActions.setEmail(value))
    }, [dispatch]);

    const onLoginClick = useCallback(async (e?: React.MouseEvent | React.FormEvent) => {
        e?.preventDefault();
        console.log('[LOGIN] Кнопка нажата');

        const result = await dispatch(loginByUsername({username, email, password}));
        if (result.meta.requestStatus === 'fulfilled') {
            console.log('[LOGIN] Успешный вход');
            onSuccess();
        }
    }, [onSuccess, dispatch, username, email, password]);

    return (
        <DynamicModuleLoader removeAfterUnmount={true} reducers={initialReducers}>
            {/*  SEO */}
            <SeoHead
                title={`Вход — ${APP_NAME}`}
                description={`Войдите в свой аккаунт ${APP_NAME}, чтобы управлять списками желаемых подарков, просматривать идеи друзей и резервировать подарки.`}
                url={`https://vishi.ru/wish/${``}`}
                image="/images/preview-wish.jpg"
            />

            <div className={classNames(cls.LoginForm, {}, [className])} >
                <Text title={'Форма авторизации'} className={cls.title}/>
                {error && 
                    <Text 
                        text={"Ошибка: Введенные вами данные неверны"} 
                        theme={TextTheme.ERROR}
                        className={cls.error}
                    />
                }
                
                <div className={classNames(cls.inputs)}>

                    <div className={cls.testImputs}>
                        <Input 
                            type="text" 
                            className={cls.input} 
                            placeholder="Введите Имя"
                            onChange={onChangeUsername}
                            value={username}
                        />
                        <Input 
                            type="text" 
                            className={cls.input} 
                            placeholder="Введите почту"
                            onChange={onChangeEmail}
                            value={email}
                        />
                        <Input 
                            type="text" 
                            className={cls.input} 
                            placeholder="Введите пароль"
                            onChange={onChangePassword}
                            value={password}
                        />
                    </div>
                </div>
                
                
                <Button 
                    className={cls.loginBtn} 
                    theme={ButtonTheme.BACKGROUND}
                    onClick={onLoginClick}
                    disabled={isLoading}
                >
                    войти 
                </Button>
            </div>
        </DynamicModuleLoader>
    )
})

export default LoginForm;