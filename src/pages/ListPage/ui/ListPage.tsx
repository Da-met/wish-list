import React, { useCallback, useState } from "react";
import { Page } from "@/widgets/Page/Page";
import cls from './ListPage.module.scss';
import { Text } from "@/shared/ui/Text/Text";
import { SheetList } from "@/entities/Sheets";
import { Button, ButtonSize } from "@/shared/ui/Button/Button";
import { useSelector } from "react-redux";
import { getListsIsLoading } from "@/entities/Sheets/model/selectors/listSelectors";
import { getLists } from "@/entities/Sheets/model/slice/listSlice";
import { SheetCreate } from "@/features/addList";
import { getUserAuthData } from "@/entities/User";
import { SeoHead } from "@/shared/ui/SeoHead/SeoHead";
import { APP_NAME } from "@/shared/config/appName/appName";



const ListPage = () => {
    const [isSheetCreateModal, setIsSheetCreateModal] = useState(false);
    const onCloseSheetCreateModal = useCallback(() => {
        setIsSheetCreateModal(false);
    }, []);

    const onShowSheetCreateModal = useCallback(() => {
        setIsSheetCreateModal(true);
    }, []);

    const isLoading = useSelector(getListsIsLoading);
    const myLists = useSelector(getLists.selectAll);
    const authData = useSelector(getUserAuthData);

    return (
        <>
            {/*  SEO */}
            <SeoHead
                title={`Мои списки подарков — ${APP_NAME} `}
                description={`
                    Создавайте списки подарков, бронируйте желания друзей и делитесь вдохновением. 
                    ${APP_NAME} — удобный сервис для выбора и хранения подарков.
                `}
                url="https://vishy.vercel.app/list"
                image="/images/pre-png.png"
            />
            <Page >
                <div className={cls.background}>
                    <div className={cls.ListPage}>
                        <Text title={'Листы'} className={cls.title}  titleTag="h1"/>
                    </div>

                    <div className={cls.wrapperBtn}>
                        <div className={cls.wrapperNew} >
                            <Button 
                                onClick={onShowSheetCreateModal}
                                className={cls.btn} 
                                // size={ButtonSize.L}
                            >
                                + Создать новый лист +
                            </Button>
                        </div>
                        
                    </div>

                    <div className={cls.wrapper}>
                        <SheetList myLists={myLists} ownerId={authData?.id} isLoading={isLoading}/>
                    </div>

                    { isSheetCreateModal &&  <SheetCreate 
                        isOpen={isSheetCreateModal} 
                        onClose={onCloseSheetCreateModal}
                        setIsSheetCreateModal={setIsSheetCreateModal}
                    />}
                </div>
            </Page>
        </>
    );
};

export default ListPage;