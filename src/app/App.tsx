import { Suspense, useEffect } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import { useTheme } from "./providers/ThemeProvider";
import { AppRouter } from "./providers/router";
import { Navbar } from "@/widgets/Navbar";
import { Sidebar } from "@/widgets/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getUserAuthData, getUserInited, userActions } from "@/entities/User";
import { fetchFriendsList } from "@/pages/FriendsPage/model/services/fetchFriendsList/fetchFriendsList";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { fetchLists } from "@/entities/Sheets/model/services/fetchLists/fetchLists";







const App = () => {
    const { theme } = useTheme();
    const dispatch = useAppDispatch();
    const inited = useSelector(getUserInited);
    const authData = useSelector(getUserAuthData);


    // 🔧 ФИКС для Яндекс.Браузера
    useEffect(() => {
        const isYandexBrowser = /YaBrowser|Yowser/.test(navigator.userAgent);
        if (isYandexBrowser) {
            console.log('🔧 Применяем фикс для Яндекс.Браузера');
            
            // Добавляем класс к body
            document.body.classList.add('yandex-browser');
            
            // Фиксируем размеры
            const updateHeight = () => {
                const vh = window.innerHeight;
                document.documentElement.style.setProperty('--mobile-height', `${vh}px`);
            };
            
            updateHeight();
            window.addEventListener('resize', updateHeight);
            
            return () => window.removeEventListener('resize', updateHeight);
        }
    }, []);



    useEffect(() => {
        dispatch(userActions.initAuthData());
    }, [dispatch])

    useEffect(() => {
        if (inited && authData?.id) {
            dispatch(fetchFriendsList({ idUser: Number(authData.id) }));
            dispatch(fetchLists({ idUser: Number(authData.id) }))
        }
    }, [dispatch, inited, authData?.id]);


    return (
        <div className={classNames('app', {}, [theme])}>
            <Suspense fallback="">
                <Navbar />
                <div className="content-page">
                    <Sidebar className="sidebar"/>
                    {inited && <AppRouter />}
                </div>
            </Suspense>    
        </div>
    );
};

export default App;