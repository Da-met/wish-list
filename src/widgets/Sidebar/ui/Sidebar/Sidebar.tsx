import { classNames } from "shared/lib/classNames/classNames";
import cls from './Sidebar.module.scss';
import { memo, useMemo, useState } from "react";

import { Button, ButtonSize, ButtonTheme } from 'shared/ui/Button/Button';

import { ThemeSwitcher } from "shared/ui/ThemeSwitcher";
import { SidebarItemsList } from "widgets/Sidebar/model/items";
import SidebarItem from "../SidebarItem/SidebarItem";



interface SidebarProps {
    className?: string;
}

export const Sidebar = memo(({className}: SidebarProps ) => {
    const [ collapsed, setCollapsed ] = useState(true);

    const onToggle = () => {
        setCollapsed(prev => !prev)
    }

    const itemsList = useMemo(() => SidebarItemsList.map((item) => (
        <SidebarItem 
            item={item}
            collapsed={collapsed}
            key={item.path}
        />
    )), [collapsed])


    return (
        <div 
            data-testid='sidebar' 
            className={classNames(cls.Sidebar, {[cls.collapsed]: collapsed}, [className])}
        >
            <Button 
                data-testid='sidebar-toggle' 
                onClick={onToggle}
                className={ cls.collapseBtn } 
                // theme={ButtonTheme.BACKGROUND_INVERTED}
                size={ButtonSize.L}
                square
            >
                {collapsed ? '>' : '<'}
            </Button>


            <div className={cls.items}>
                {itemsList}
            </div>

            <div className={cls.switchers}>
                <ThemeSwitcher />    
            </div>

            {/* <BugButton /> */}
        </div>
    );
});