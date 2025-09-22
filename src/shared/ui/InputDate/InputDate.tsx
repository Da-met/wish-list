// shared/ui/DateInput/DateInput.tsx
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './InputDate.module.scss';
import { memo, useCallback, useRef, useState } from 'react';
import CalendarIcon from "../../../shared/assets/icons/calendar.svg"

interface DateInputProps {
    className?: string;
    value?: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export const InputDate = memo((props: DateInputProps) => {
    const {
        className,
        value = '',
        onChange,
        placeholder = 'дд.мм.гггг'
    } = props;

    const [showNative, setShowNative] = useState(false);
    const nativeInputRef = useRef<HTMLInputElement>(null);

    // Открываем нативный пикер даты
    const openNativePicker = useCallback(() => {
        setShowNative(true);
        
        // Даем время на рендер нативного input перед открытием пикера
        setTimeout(() => {
            if (nativeInputRef.current) {
                nativeInputRef.current.showPicker?.();
            }
        }, 100);
    }, []);

    const handleNativeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
        setShowNative(false);
    }, [onChange]);

    const handleNativeBlur = useCallback(() => {
        setShowNative(false);
    }, []);

    // Форматируем дату для отображения
    const displayDate = value 
        ? new Date(value).toLocaleDateString('ru-RU')
        : '';

    return (
        <div className={classNames(cls.DateInput, {}, [className])}>
            {/* Текстовое поле, которое только для отображения */}
            <input
                type="text"
                className={cls.textInput}
                placeholder={placeholder}
                value={displayDate}
                onFocus={openNativePicker} // Открываем пикер при фокусе
                readOnly
            />
            
            {/* Кнопка календаря - видна всегда */}
            <button
                type="button"
                className={cls.pickerButton}
                onClick={openNativePicker}
                aria-label="Выбрать дату"
            >
                {/* 📅 */}
                <CalendarIcon/>
            </button>

            {/* Скрытый нативный input для выбора даты */}
            {showNative && (
                <input
                    ref={nativeInputRef}
                    type="date"
                    value={value}
                    onChange={handleNativeChange}
                    onBlur={handleNativeBlur}
                    className={cls.nativeInput}
                    min="1900-01-01"
                    max="2025-12-31"
                    autoFocus
                />
            )}
        </div>
    );
});