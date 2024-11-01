import { Route, Routes, Link } from "react-router-dom";

import './styles/index.scss';
import { AboutPageAsync } from "./pages/AboutPage/AboutPage.async";
import { MainPageAsync } from "./pages/MainPage/MainPage.async";
import { Suspense, useContext, useState } from "react";
import { Theme, ThemeContext } from "./theme/ThemeContext";
import { useTheme } from "./theme/useTheme";
import { classNames } from "./helpers/classNames/classNames";





const App = () => {
    const {theme, toggleTheme} = useTheme();

    return (
        <div className={classNames('app', {}, [theme])}>
            <Link to={'/'}>ГЛАВНАЯ СТАНИЦА</Link>
            <Link to={'/about'}>О САЙТЕ</Link>
            <button onClick={toggleTheme}>TOGGLE</button>
            
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                        <Route path={'/about'} element={<AboutPageAsync />}/>
                        <Route path={'/'} element={<MainPageAsync />}/>
                </Routes>
            </Suspense>
        </div>
    );
};

export default App;