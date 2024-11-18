import { classNames } from 'shared/lib/classNames/classNames';
import React, {
    InputHTMLAttributes, memo, useEffect, useRef, useState,
} from 'react';
import cls from './Input.module.scss';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>

interface InputProps extends HTMLInputProps{
    className?: string;
    value?: string;
    onChange?: (value: string) => void;
}

export const Input = memo((props: InputProps) => {
    const {
        className,
        value,
        onChange,
        type = 'text',
        placeholder,
        ...otherProps
    } = props;

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
        
    }

    return (
        <div className={classNames(cls.Input, {}, [className])}>
            <div className={classNames(cls.InputPlaceholder)}>{`${placeholder} >`}</div>
            <input 
                className={classNames(cls.InputText, {}, [className])}
                type={type} 
                value={value}
                onChange={onChangeHandler}
                {...otherProps}
            />
        </div>
    )
})