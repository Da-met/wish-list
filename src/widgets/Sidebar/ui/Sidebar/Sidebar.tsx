import { classNames } from "@/shared/lib/classNames/classNames";
import cls from './Sidebar.module.scss';
import { memo, useMemo, useState } from "react";

import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button/Button';

import { ThemeSwitcher } from "@/shared/ui/ThemeSwitcher";

import SidebarItem from "../SidebarItem/SidebarItem";
import { useSelector } from "react-redux";
import { getSidebarItems } from '../../model/selectors/getSidebarItems';
import { useMobileHeight } from "@/shared/lib/hooks/useMobileHeight/useMobileHeight";


interface SidebarProps {
    className?: string;
}

export const Sidebar = memo(({className}: SidebarProps ) => {
    const [ collapsed, setCollapsed ] = useState(true);
    const sidebarItemsList = useSelector(getSidebarItems);
    const mobileHeight = useMobileHeight();
    
    const onToggle = () => {
        setCollapsed(prev => !prev)
    }
    const handleItemClick = () => {
        setCollapsed(true);
    };

    const itemsList = useMemo(
        () => 
            sidebarItemsList.map((item) => (
                <SidebarItem 
                    item={item}
                    collapsed={collapsed}
                    key={item.path}
                    onClick={handleItemClick}
                />
        )),
        [collapsed, sidebarItemsList]
    );

    // Вычисляем высоту с учетом мобильной панели
    const sidebarHeight = mobileHeight - 50 - 70; // navbar + отступы


    return (
        <div 
            data-testid='sidebar' 
            className={classNames(cls.Sidebar, {[cls.collapsed]: collapsed}, [className])}
            style={{ height: `${sidebarHeight}px` }} // ЖЕСТКО задаем высоту
        >

            <div className={cls.items}>
                {itemsList}
            </div>

            <div className={ cls.btnWrap }>
                <Button 
                    data-testid='sidebar-toggle' 
                    onClick={onToggle}
                    className={ cls.collapseBtn } 
                    theme={ButtonTheme.CLEAR}
                    size={ButtonSize.L}
                    square
                >
                    {collapsed ? '>' : '<'}
                </Button>
            </div>
            
            <div className={cls.switchers}>
                <ThemeSwitcher />   
            </div>

            {/* <BugButton /> */}
        </div>
    );
});