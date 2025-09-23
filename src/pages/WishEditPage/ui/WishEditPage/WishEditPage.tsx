import { memo } from "react";
import { useParams } from "react-router-dom";
import { Page } from "@/widgets/Page/Page";

import cls from './WishEditPage.module.scss';
import { Text } from "@/shared/ui/Text/Text";
import { useSelector } from "react-redux";
import { getWishDetailsData } from "@/entities/Wish/model/selectors/wishDetails";
import { DynamicModuleLoader, ReducersList } from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { wishDetailsReducer } from "@/entities/Wish/model/slice/wishDetailsSlice";
import { WishCreate } from "@/features/addWishForm";
import { SeoHead } from "@/shared/ui/SeoHead/SeoHead";
import { APP_IMG, APP_NAME } from "@/shared/config/appName/appName";



interface WishEditPageProps {
    className?: string;
}

const reducers: ReducersList = {
    wishDetails: wishDetailsReducer,
}

const WishEditPage = memo((props: WishEditPageProps) => {
    const {className} = props;
    const {id} = useParams<{id: string}>();
    // console.log(id)
    const isEdit = Boolean(id);
    const thisWish = useSelector(getWishDetailsData)
    console.log(props)

    const title = isEdit ? `Редактировать желание — ${APP_NAME}` : `Создать новое желание — ${APP_NAME}`;
    const description = isEdit 
        ? `Измените данные подарка, добавьте фото, описание и ссылку.` 
        : `Добавьте новый подарок в список желаемого, чтобы друзья могли его увидеть и зарезервировать.`;


    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={true}>
            {/*  SEO */}
            <SeoHead
                title={title}
                description={description}
                url={`https://vishy.vercel.app/wishes/${id ? `${id}/edit` : 'new'}`}
                // image={APP_IMG}
            />
            <Page>
                <div className={cls.wrapper}>
                    <Text title={isEdit ? 'Редактировать желание' : 'Создать желание'} className={cls.header} titleTag="h1"/>
                    <WishCreate id={id} isEdit={isEdit}/>
                </div>
            </Page>
        </DynamicModuleLoader>
    )
})

export default WishEditPage;