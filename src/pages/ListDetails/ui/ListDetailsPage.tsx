import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, useEffect, useState } from 'react';
import cls from './ListDetailsPage.module.scss';
import { useParams } from 'react-router-dom';
import { Page } from '@/widgets/Page/Page';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { getLists } from '@/entities/Sheets/model/slice/listSlice';
import { WishListItem } from '@/entities/Wish/ui/WishListItem/WishListItem';
import { WishesByList, wishesByListReducer } from '@/features/fetchWishesByListId';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Text } from "@/shared/ui/Text/Text";
import { ListById } from '@/entities/ListById/model/types';
import { getListById } from '@/entities/ListById/model/api';
import { listDetailsReducer } from '@/entities/List';
import { SeoHead } from '@/shared/ui/SeoHead/SeoHead';
import { APP_NAME } from '@/shared/config/appName/appName';

interface ListDetailsPageProps {
    className?: string;
}

const reducers: ReducersList = {
    wishesByList: wishesByListReducer,
    // listDetails: listDetailsReducer,
};

const ListDetailsPage = (props: ListDetailsPageProps) => {
    const { className } = props;
    const { id } = useParams<{id: string}>();
    const dispatch = useAppDispatch();

    const [list, setList] = useState<ListById | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        const fetchList = async () => {
            try {
                const data = await getListById(Number(id));
                setList(data);
            } catch (e) {
                setError('Ошибка при загрузке списка');
                console.error(e);
            } finally {
                setIsLoading(false);
            }
        };

        fetchList();
    }, [id]);

    if (isLoading) return <div>Загрузка...</div>;
    if (error) return <div>{error}</div>;
    if (!list) return <div>Список не найден</div>;

    const title = list ? `${list.name} — ${APP_NAME}` : `Список подарков — ${APP_NAME}`;
    const description = list 
    ? `Список подарков "${list.name}" в ${APP_NAME}. Просматривайте идеи, делитесь с друзьями и бронируйте подарки.` 
    : `Список подарков в ${APP_NAME}.`;

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            {/*  SEO */}
            <SeoHead
                title={title}
                description={description}
                url="https://vishy.vercel.app/lists"
                image="/images/pre-png.png"
            />
            <Page className={classNames(cls.ListDetailsPage, {}, [className])}>
                <div className={cls.wrapper}>
                    <div className={cls.textWrapper}>
                        <Text title={'Спосок подарков из листа'} className={cls.title}  titleTag="h1"/>
                    </div>
                    <div className={cls.wrappName}>
                        <h2 className={cls.name}>{list?.name}</h2>
                    </div>
                    
                    <div className={cls.wrapperCards}>
                        <WishesByList listId={String(list?.id)}/>
                    </div>
                    
                </div>
                
            </Page>
        </DynamicModuleLoader>
    );
};

export default memo(ListDetailsPage);