import { classNames } from "@/shared/lib/classNames/classNames";
import cls from './RegistrationForm.module.scss';
import { Button, ButtonTheme } from "@/shared/ui/Button/Button";
import { Input } from "@/shared/ui/Input/Input";
import { useSelector } from "react-redux";
import { memo, useCallback, useEffect, useRef } from "react";
import { DynamicModuleLoader, ReducersList } from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { InputImg } from "@/shared/ui/InputImg/InputImg";
import { Text, TextTheme } from "@/shared/ui/Text/Text";
import { registrationActions, registrationReducer } from "../../model/slice/registrationSlice";
import { getRegistrationUsername } from "../../model/selectors/getRegistrationUsername/getRegistrationUsername";
import { registrationProfile } from "../../model/services/registration";
import { getRegistrationPassword } from "../../model/selectors/getRegistrationPassword/getRegistrationPassword";
import { getRegistrationEmail } from "../../model/selectors/getRegistrationEmail/getRegistrationEmail";
import { getRegistrationBirthday } from "../../model/selectors/getRegistrationBirthday/getRegistrationBirthday";
import { getRegistrationImg } from "../../model/selectors/getRegistrationImg/getRegistrationImg";
import { getRegistrationError } from "../../model/selectors/getRegistrationError/getRegistrationError";
import { getRegistrationIsLoading } from "../../model/selectors/getRegistrationIsLoading/getRegistrationIsLoading";
import { SeoHead } from "@/shared/ui/SeoHead/SeoHead";
import { APP_NAME } from "@/shared/config/appName/appName";
import { StateSchema } from "@/app/providers/StoreProvider";



export interface RegistrationFormProps {
    className?: string;
    onSuccess: () => void;
}

const initialReducers: ReducersList = {
    registration: registrationReducer,
}


const RegistrationForm = memo(({className, onSuccess}: RegistrationFormProps) => {
    const dispatch = useAppDispatch();
    const firstInputRef = useRef<HTMLInputElement>(null);
    
    const { username, email, password, birthday, img, error, isLoading } = 
        useSelector((state: StateSchema) => ({
            username: getRegistrationUsername(state),
            email: getRegistrationEmail(state),
            password: getRegistrationPassword(state),
            birthday: getRegistrationBirthday(state),
            img: getRegistrationImg(state),
            error: getRegistrationError(state),
            isLoading: getRegistrationIsLoading(state),
    }));

    useEffect(() => {
        firstInputRef.current?.focus();
    }, []);


    const onChangeUsername = useCallback((value: string) => {
        dispatch(registrationActions.setUsername(value));
        if (error) dispatch(registrationActions.setError(''));
    }, [dispatch, error]);

    const onChangePassword = useCallback((value: string) => {
        dispatch(registrationActions.setPassword(value));
        if (error) dispatch(registrationActions.setError(''));
    }, [dispatch]);

    const onChangeEmail = useCallback((value: string) => {
        dispatch(registrationActions.setEmail(value));
        if (error) dispatch(registrationActions.setError(''));
    }, [dispatch]);

    const onChangeBirthday = useCallback((value: string) => {
        dispatch(registrationActions.setBirthday(value));
        if (error) dispatch(registrationActions.setError(''));
    }, [dispatch]);

    const onChangeImg = useCallback((value: string ) => {
        dispatch(registrationActions.setImg(value));
        if (error) dispatch(registrationActions.setError(''));
    }, [dispatch]);

    const onRegisterClick = useCallback(async () => {
        // ВАЛИДАЦИЯ
        if (!username || !email || !password || !birthday) {
            dispatch(registrationActions.setError('Все поля должны быть заполнены'));
            return;
        }

        // ПРОВЕРКА EMAIL
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            dispatch(registrationActions.setError('Введите корректный email'));
            return;
        }

        const result = await dispatch(registrationProfile({
            username, email, password, img, birthday
        }));
        
        if (result.meta.requestStatus === 'fulfilled') {
            onSuccess();
        }
    }, [username, email, password, img, birthday, dispatch, onSuccess]);

    const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            onRegisterClick();
        }
    }, [onRegisterClick]);

    

    return (
        <DynamicModuleLoader removeAfterUnmount={true} reducers={initialReducers}>
            {/*  SEO */}
            <SeoHead
                title={`Регистрация — ${APP_NAME}`}
                description={`Создайте аккаунт в ${APP_NAME}, чтобы хранить списки желаемых подарков и делиться ими с друзьями.`}
                url={`https://vishy.vercel.app/registration`}
                image="/images/pre-png.png"
            />

            <div className={classNames(cls.RegistrationForm, {}, [className])} onKeyPress={handleKeyPress}>
                <Text title={'Форма регистрации'}  className={cls.title}/>

                {/* // ДОБАВИТЬ ОБРАБОТКУ ОШИБКИ  */}
                {error && 
                    <Text 
                        text={error} 
                        theme={TextTheme.ERROR}
                        className={cls.error}
                    />
                }
                
                <div className={classNames(cls.inputs)}>
                    <InputImg 
                        className={cls.imgImputs}
                        onChange={onChangeImg}
                        value={img}
                    />

                    <div className={cls.testImputs}>
                        <Input 
                            type="text" 
                            className={cls.input} 
                            placeholder="Имя"
                            onChange={onChangeUsername}
                            value={username}
                        />
                        <Input 
                            type="text" 
                            className={cls.input} 
                            placeholder="Почта"
                            onChange={onChangeEmail}
                            value={email}
                        />
                        <div >
                            <Text text="Дата Рождения" className={cls.calendarText}/>
                            <input 
                                className={cls.calendar} 
                                type="date"  
                                onChange={(e) => onChangeBirthday(e.target.value)}
                                value={birthday}
                            />
                        </div>
                        
                        <Input 
                            type="password" 
                            className={cls.input} 
                            placeholder="Пароль"
                            onChange={onChangePassword}
                            value={password}
                        />
                    </div>
                </div>
                
                
                <Button 
                    className={cls.registrationBtn} 
                    theme={ButtonTheme.BACKGROUND}
                    onClick={onRegisterClick}
                    // disabled={isLoading}
                >
                    {isLoading ? 'Регистрация...' : 'Зарегистрироваться'} 
                </Button>
            </div>
        </DynamicModuleLoader>
    )
})

export default RegistrationForm;

