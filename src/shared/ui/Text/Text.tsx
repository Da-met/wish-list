import { classNames, Mods } from "@/shared/lib/classNames/classNames";
import cls from './Text.module.scss';
import { memo } from "react";


export enum TextTheme {
    PRIMARY = 'primary',
    ERROR = 'error',
}

export enum TextAlign {
    RIGHT = 'right',
    LEFT = 'left',
    CENTER = 'center',
}

export enum TextSize {
    S = 'size_s',
    M = 'size_m',
    L = 'size_l',
    XL = 'size_xl',
}

interface TextProps {
    className?: string;
    title?: string;
    text?: string;
    theme?: TextTheme;
    align?: TextAlign;
    size?: TextSize;
    titleTag?: 'h1' | 'h2' | 'h3' | 'p';

    'data-testid'?: string;
}


export const Text = memo((props: TextProps) => {
    const {
        className,
        text,
        title,
        titleTag = 'p',
        theme = TextTheme.PRIMARY,
        align = TextAlign.LEFT,
        size = TextSize.M,

        'data-testid': dataTestId = 'Text',
    } = props;

    
    const mods: Mods = {
        [cls[theme]]: true,
        [cls[align]]: true,
        [cls[size]]: true,
    };

    const TitleTag = titleTag; 

    return (
        <div className={classNames(cls.Text, mods, [className])}>
            {title && (
                <TitleTag
                    className={cls.title}
                    data-testid={`${dataTestId}.Header`}
                >
                    {title}
                </TitleTag>)}
            {text && (
                <p
                    className={cls.text}
                    data-testid={`${dataTestId}.Paragraph`}
                >
                    {text}
                </p>
            )}
        </div>
    );
});