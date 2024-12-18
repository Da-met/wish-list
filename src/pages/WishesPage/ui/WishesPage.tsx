import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import cls from './WishesPage.module.scss';

interface WishesPageProps {
    className?: string;
}

const WishesPage = (props: WishesPageProps) => {
    const { className } = props;


    return (
        <div className={classNames(cls.WishesPage, {}, [className])}>
            WISHES PAGE
        </div>
    );
};

export default memo(WishesPage);