import { classNames, Mods } from "@/shared/lib/classNames/classNames";
import cls from './PageHeading.module.scss';
import { ButtonHTMLAttributes, FC, memo, ReactNode } from "react";






interface PageHeadingProps {
    className?: string;
    children?: ReactNode;
};

export const PageHeading = memo(( props: PageHeadingProps ) => {
    const {
        className,
        children,
        ...otherProps
    } = props;




    return (
        <div className={cls.PageHeading}>
            {children}
        </div>
    )
})