import { classNames } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';
import cls from './CompilationsDetailsPage.module.scss';
import { WishDetails } from '@/entities/Wish';
import { useParams } from 'react-router-dom';
import { Page } from '@/widgets/Page/Page';
import { CompilationDetails } from '@/entities/Compilations';

interface CompilationsDetailsPageProps {
    className?: string;
}

const CompilationsDetailsPage = (props: CompilationsDetailsPageProps) => {
    const { className } = props;
    const { id } = useParams<{id: string}>();

    // if(!id) {
    //     return (
    //         <div className={classNames(cls.WishDetailsPage, {}, [className])}>
    //             Желание не найдено
    //         </div>
    //     )
    // }

    return (
        <Page className={classNames(cls.WishDetailsPage, {}, [className])}>
            {/* <WishDetails id={id}/> */}
            <CompilationDetails id={id}/>
        </Page>
    );
};

export default memo(CompilationsDetailsPage);