import { useState, useEffect } from 'react';

export const useSafeHeight = () => {
    const [safeHeight, setSafeHeight] = useState(window.innerHeight);

    useEffect(() => {
        const updateHeight = () => {
            // Используем window.innerHeight вместо 100vh
            setSafeHeight(window.innerHeight);
        };

        updateHeight();
        
        window.addEventListener('resize', updateHeight);
        window.addEventListener('orientationchange', updateHeight);
        
        // Частое обновление для мобильных браузеров
        const interval = setInterval(updateHeight, 100);
        
        return () => {
            window.removeEventListener('resize', updateHeight);
            window.removeEventListener('orientationchange', updateHeight);
            clearInterval(interval);
        };
    }, []);

    return safeHeight;
};