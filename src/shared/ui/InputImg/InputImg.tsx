import { classNames, Mods } from 'shared/lib/classNames/classNames';
import React, {
    InputHTMLAttributes, memo, useEffect, useRef, useState,
} from 'react';
import cls from './InputImg.module.scss';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'readOnly'>

interface InputImgProps extends HTMLInputProps{
    className?: string;
    value?: string ; 
    onChange?: (file: File | null) => void;
    readonly?: boolean;
}

export const InputImg = memo((props: InputImgProps) => {
    const {
        className,
        value,
        onChange,
        type = 'file',
        readonly,
        ...otherProps
    } = props;
    
    const [preview, setPreview] = useState<string | null>(value || null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Обновляем превью, если value изменилось
    useEffect(() => {
        if (value) {
            setPreview(value);
        }
    }, [value]);

    // Обработчик загрузки файла
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        if (file) {
            const url = URL.createObjectURL(file); // Создаем blob-URL для превью
            setPreview(url); // Показываем превью            
            onChange?.(file); // Вызываем onChange с переданным файлом, чтобы передать его в верхние компоненты
        } else {
            setPreview(null); // Если файл не выбран, сбрасываем превью
        }
    };

    // Обработчик клика по изображению или кнопке
    const handleClick = () => {
        if (readonly) return;
        inputRef.current?.click();
    };

    const mods: Mods = {
        [cls.readonly]: readonly,
    };

    return (
        
        <div className={classNames(cls.InputImgWrapper, {}, [className])} onClick={handleClick}>
            {!preview ? (
                <div className={cls.UploadButton}>
                    Аватар
                </div>
            ) : (
                <img
                    src={preview?.startsWith('blob:') ? preview : `http://localhost:5000/${preview}`}
                    alt="Uploaded preview"
                    className={classNames(cls.ImagePreview, mods, [className])}
                />
            )}
            <input
                ref={inputRef}
                className={cls.InputFile}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                readOnly={readonly}
                {...otherProps}
            />
        </div>
    )
})