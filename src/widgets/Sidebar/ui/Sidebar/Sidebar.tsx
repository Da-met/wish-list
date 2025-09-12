import { classNames } from "@/shared/lib/classNames/classNames";
import cls from './Sidebar.module.scss';
import { memo, useMemo, useState } from "react";

import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button/Button';

import { ThemeSwitcher } from "@/shared/ui/ThemeSwitcher";

import SidebarItem from "../SidebarItem/SidebarItem";
import { useSelector } from "react-redux";
import { getSidebarItems } from '../../model/selectors/getSidebarItems';


interface SidebarProps {
    className?: string;
}

export const Sidebar = memo(({className}: SidebarProps ) => {
    const [ collapsed, setCollapsed ] = useState(true);
    const sidebarItemsList = useSelector(getSidebarItems);
    
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


    return (
        <div className={cls.sidebarWrapper}>
            <div 
                data-testid='sidebar' 
                className={classNames(cls.Sidebar, {[cls.collapsed]: collapsed}, [className])}
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
        </div>
    );
});