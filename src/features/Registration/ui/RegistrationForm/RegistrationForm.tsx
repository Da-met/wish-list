import { classNames } from "@/shared/lib/classNames/classNames";
import cls from './RegistrationForm.module.scss';
import { Button, ButtonTheme } from "@/shared/ui/Button/Button";
import { Input } from "@/shared/ui/Input/Input";
import { useSelector } from "react-redux";
import { memo, useCallback } from "react";
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
import { SeoHead } from "@/shared/ui/SeoHead/SeoHead";
import { APP_NAME } from "@/shared/config/appName/appName";



export interface RegistrationFormProps {
    className?: string;
    onSuccess: () => void;
}

const initialReducers: ReducersList = {
    registration: registrationReducer,
}


const RegistrationForm = memo(({className, onSuccess}: RegistrationFormProps) => {
    const dispatch = useAppDispatch();

    const username = useSelector(getRegistrationUsername);
    const email = useSelector(getRegistrationEmail);
    const password = useSelector(getRegistrationPassword);
    const birthday = useSelector(getRegistrationBirthday);
    const img = useSelector(getRegistrationImg);
    const error = useSelector(getRegistrationError);
    // const isLoading = useSelector(getRegistrationIsLoading);


    const onChangeUsername = useCallback((value: string) => {
        dispatch(registrationActions.setUsername(value))
    }, [dispatch]);

    const onChangePassword = useCallback((value: string) => {
        dispatch(registrationActions.setPassword(value))
    }, [dispatch]);

    const onChangeEmail = useCallback((value: string) => {
        dispatch(registrationActions.setEmail(value))
    }, [dispatch]);

    const onChangeBirthday = useCallback((value: string) => {
        dispatch(registrationActions.setBirthday(value))
    }, [dispatch]);

    const onChangeImg = useCallback((value: string ) => {
        console.log(value)
        dispatch(registrationActions.setImg(value))
    }, [dispatch]);

    const onRegisterClick = useCallback(async () => {
        console.log(error)
        const result = await dispatch(registrationProfile({username, email, password, img, birthday}));
        if (result.meta.requestStatus === 'fulfilled') {
            onSuccess();
        }
    }, [onSuccess, dispatch, username, email, password, img, birthday]);

    

    return (
        <DynamicModuleLoader removeAfterUnmount={true} reducers={initialReducers}>
            {/*  SEO */}
            <SeoHead
                title={`Регистрация — ${APP_NAME}`}
                description={`Создайте аккаунт в ${APP_NAME}, чтобы хранить списки желаемых подарков и делиться ими с друзьями.`}
                url={`https://vishi.ru/wish/${``}`}
                image="/images/preview-wish.jpg"
            />

            <div className={classNames(cls.RegistrationForm, {}, [className])} >
                <Text title={'Форма регистрации'}  className={cls.title}/>

                {/* // ДОБАВИТЬ ОБРАБОТКУ ОШИБКИ  */}
                {error && 
                    <Text 
                        title={error}
                        text={"Ошибка: Все поля должны быть заполнены"} 
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
                            type="text" 
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
                    зарегистрироваться 
                </Button>
            </div>
        </DynamicModuleLoader>
    )
})

export default RegistrationForm;

