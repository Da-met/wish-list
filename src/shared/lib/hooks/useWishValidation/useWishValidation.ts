import { useState, useCallback } from 'react';

export interface ValidationErrors {
    [key: string]: string;
}

export interface ValidationTouched {
    [key: string]: boolean;
}

export const useWishValidation = () => {
    // Состояние для ошибок
    const [errors, setErrors] = useState<ValidationErrors>({});
    
    // Состояние для отслеживания "тронутых" полей
    const [touched, setTouched] = useState<ValidationTouched>({});

    // Валидация конкретного поля
    const validateField = useCallback((field: string, value: any) => {
        setErrors(prevErrors => {
            const newErrors = { ...prevErrors };
            
            switch (field) {
                case 'name':
                    if (!value?.trim()) {
                        newErrors.name = 'Обязательное поле';
                    } else {
                        delete newErrors.name;
                    }
                    break;
                    
                case 'list':
                    if (!value) {
                        newErrors.list = 'Выберите список';
                    } else {
                        delete newErrors.list;
                    }
                    break;
                    
                case 'img':
                    if (!value?.trim()) {
                        newErrors.img = 'Добавьте изображение';
                    } else {
                        delete newErrors.img;
                    }
                    break;
                    
                default:
                    break;
            }
            
            return newErrors;
        });
    }, []);

    // Валидация всей формы
    const validateForm = useCallback((formData: {
        name?: string;
        list?: number;
        img?: string;
    }) => {
        const newErrors: ValidationErrors = {};
        
        if (!formData.name?.trim()) {
            newErrors.name = 'Обязательное поле';
        }
        if (!formData.list) {
            newErrors.list = 'Выберите список';
        }
        if (!formData.img?.trim()) {
            newErrors.img = 'Добавьте изображение';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }, []);

    // Пометить поле как "тронутое" (пользователь взаимодействовал)
    const markFieldAsTouched = useCallback((field: string) => {
        setTouched(prev => ({ ...prev, [field]: true }));
    }, []);

    // Очистить ошибку для конкретного поля
    const clearError = useCallback((field: string) => {
        setErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors[field];
            return newErrors;
        });
    }, []);

    // Сбросить все ошибки
    const resetErrors = useCallback(() => {
        setErrors({});
        setTouched({});
    }, []);

    return {
        errors,          // Текущие ошибки
        touched,         // Какие поля были тронуты
        validateField,   // Валидировать поле
        validateForm,    // Валидировать всю форму
        markFieldAsTouched, // Пометить поле как тронутое
        clearError,      // Очистить ошибку поля
        resetErrors,     // Сбросить все ошибки
    };
};