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

    // 🔧 ТОЛЬКО детектор Яндекс.Браузера
    useEffect(() => {
        const isYandexBrowser = /YaBrowser|Yowser/.test(navigator.userAgent);
        if (isYandexBrowser) {
            document.body.classList.add('yandex-browser-only');
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