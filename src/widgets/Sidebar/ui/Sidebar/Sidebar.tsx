import { classNames } from "shared/lib/classNames/classNames";
import cls from './Sidebar.module.scss';
import { useState } from "react";
import { ThemeSwitcher } from "widgets/ThemeSwitcher";
import { BugButton } from "app/providers/ErrorBoundary";
import { Button } from 'shared/ui/Button/Button';


interface SidebarProps {
    className?: string;
}

export const Sidebar = ({className}: SidebarProps ) => {
    const [ collapsed, setCollapsed ] = useState(false);

    const onToggle = () => {
        setCollapsed(prev => !prev)
    }

    return (
        <div data-testid='sidebar' className={classNames(cls.Sidebar, {[cls.collapsed]: collapsed}, [className])}>
            <Button data-testid='sidebar-toggle' onClick={onToggle}>TOGGLE</Button>
            <div className={cls.switchers}>
                <ThemeSwitcher />    
            </div>

            {/* <BugButton /> */}
        </div>
    );
};