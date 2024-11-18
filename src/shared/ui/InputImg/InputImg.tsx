import { classNames } from 'shared/lib/classNames/classNames';
import React, {
    InputHTMLAttributes, memo, useEffect, useRef, useState,
} from 'react';
import cls from './InputImg.module.scss';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>

interface InputImgProps extends HTMLInputProps{
    className?: string;
    onChange?: (file: File | null) => void;
}

export const InputImg = memo((props: InputImgProps) => {
    const {
        className,
        onChange,
        type = 'file',
        ...otherProps
    } = props;

    const [preview, setPreview] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Обработчик загрузки файла
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        if (file) {
            const fileURL = URL.createObjectURL(file);
            setPreview(fileURL); // Устанавливаем превью
            if (onChange) {
                onChange(file);
            }
        }
    };

    // Обработчик клика по изображению или кнопке
    const handleClick = () => {
        inputRef.current?.click();
    };


    return (
        <div className={cls.InputImgWrapper} onClick={handleClick}>
            {!preview ? (
                <div className={cls.UploadButton}>
                    Аватар
                </div>
            ) : (
                <img
                    src={preview}
                    alt="Uploaded preview"
                    className={cls.ImagePreview}
                />
            )}
            <input
                ref={inputRef}
                className={cls.InputFile}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                {...otherProps}
            />
        </div>
    )
})