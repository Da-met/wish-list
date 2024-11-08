import { classNames } from "shared/lib/classNames/classNames";
import cls from './Sidebar.module.scss';
import { useState } from "react";

import { BugButton } from "app/providers/ErrorBoundary";
import { Button, ButtonSize, ButtonTheme } from 'shared/ui/Button/Button';

import LeftIcon from 'shared/assets/icons/chevrons-left.svg';
import RightIcon from 'shared/assets/icons/chevrons-right.svg';
import { AppLink, AppLinkTheme } from "shared/ui/AppLink/AppLink";
import { RoutePath } from "shared/config/routeConfig/routeConfig";

import MainIcon from 'shared/assets/icons/home.svg';
import AboutIcon from 'shared/assets/icons/file-text.svg';
import { ThemeSwitcher } from "shared/ui/ThemeSwitcher";



interface SidebarProps {
    className?: string;
}

export const Sidebar = ({className}: SidebarProps ) => {
    const [ collapsed, setCollapsed ] = useState(false);

    const onToggle = () => {
        setCollapsed(prev => !prev)
    }

    return (
        <div 
            data-testid='sidebar' 
            className={classNames(cls.Sidebar, {[cls.collapsed]: collapsed}, [className])}
        >
            <Button 
                data-testid='sidebar-toggle' 
                onClick={onToggle}
                className={ cls.collapseBtn } 
                theme={ButtonTheme.BACKGROUND_INVERTED}
                size={ButtonSize.L}
                square
            >
                {collapsed ? '>' : '<'}
            </Button>


            <div className={cls.items}>
                <AppLink 
                    className={cls.item}
                    theme={AppLinkTheme.SECONDARY} 
                    to={RoutePath.main} 
                >
                    <MainIcon className={cls.icon} />
                    <span className={cls.link}>Главная страница</span>
                </AppLink>


                <AppLink 
                    className={cls.item} 
                    theme={AppLinkTheme.SECONDARY} 
                    to={RoutePath.about}
                >
                    <AboutIcon className={cls.icon} />
                    <span className={cls.link}>О сайте</span>
                </AppLink>
            </div>

            <div className={cls.switchers}>
                <ThemeSwitcher />    
            </div>

            {/* <BugButton /> */}
        </div>
    );
};