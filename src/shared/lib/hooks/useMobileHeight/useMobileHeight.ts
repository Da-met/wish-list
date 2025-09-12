import { useState, useEffect } from 'react';

export const useMobileHeight = () => {
    const [mobileHeight, setMobileHeight] = useState(window.innerHeight);

    useEffect(() => {
        const updateHeight = () => {
            setMobileHeight(window.innerHeight);
        };

        window.addEventListener('resize', updateHeight);
        window.addEventListener('orientationchange', updateHeight);
        
        // Обновляем при каждом изменении видимости (для Яндекс.Браузера)
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                setTimeout(updateHeight, 100);
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        
        return () => {
            window.removeEventListener('resize', updateHeight);
            window.removeEventListener('orientationchange', updateHeight);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);

    return mobileHeight;
};