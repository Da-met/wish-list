import { classNames } from "@/shared/lib/classNames/classNames";
import { Link, LinkProps } from "react-router-dom";
import { FC, memo, ReactNode } from "react";
import cls from './AppLink.module.scss';
import { NavLink } from "react-router-dom";

export enum AppLinkTheme {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
}

interface AppLinkProps extends LinkProps {
    className?: string;
    theme?: AppLinkTheme;
    children?: ReactNode;
    activeClassName?: string;
}

export const AppLink = memo((props: AppLinkProps) => {
    const { 
        to, 
        className, 
        children, 
        theme = AppLinkTheme.PRIMARY, 
        activeClassName = '',
        ...otherProps 
    } = props;

    return (
        <NavLink
            to={to}
            className={({isActive}) => 
                classNames(cls.AppLink, { [cls[theme]]: true, [activeClassName]: isActive }, [className])}
            // className={classNames(cls.AppLink, { [cls[theme]]: true }, [className])}
            {...otherProps}
        >
            {children}
        </NavLink>
    )
})