import { classNames } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';
import cls from './WishDetailsPage.module.scss';
import { WishDetails } from '@/entities/Wish';
import { useParams } from 'react-router-dom';
import { Page } from '@/widgets/Page/Page';

interface WishDetailsPageProps {
    className?: string;
}

const WishDetailsPage = (props: WishDetailsPageProps) => {
    const { className } = props;
    const { id } = useParams<{id: string}>();

    if(!id) {
        return (
            <div className={classNames(cls.WishDetailsPage, {}, [className])}>
                Желание не найдено
            </div>
        )
    }

    return (
        <Page className={classNames(cls.WishDetailsPage, {}, [className])}>
            <div className={cls.wrapper}>
                <WishDetails id={id}/>
            </div>
            
        </Page>
    );
};

export default memo(WishDetailsPage);