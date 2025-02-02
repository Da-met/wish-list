import { classNames, Mods } from 'shared/lib/classNames/classNames';
import React, {
    InputHTMLAttributes, memo, useEffect, useRef, useState,
} from 'react';
import cls from './InputImg.module.scss';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'readOnly'>

interface InputImgProps extends HTMLInputProps{
    className?: string;
    value?: string ; 
    onChange?: (base64: string | null) => void; // Обработчик изменения с Base64
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
        setPreview(value || null);
    }, [value]);

    // Обработчик загрузки файла
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const base64 = reader.result as string;
                setPreview(base64); // Устанавливаем превью
                onChange?.(base64); // Передаём Base64 вверх
            };
            reader.readAsDataURL(file);
        } else {
            setPreview(null); // Если файл не выбран, сбрасываем превью
            onChange?.(null); // Очищаем значение
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
                    src={preview}
                    // src={preview?.startsWith('blob:') ? preview : `http://localhost:5000/${preview}`}
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